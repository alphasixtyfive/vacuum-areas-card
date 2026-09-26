import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

let Card;
const document = {
  createElement: () => ({ setAttribute() {}, addEventListener() {} }),
};
vm.runInNewContext(
  readFileSync(new URL("../vacuum-areas-card.js", import.meta.url), "utf8"),
  {
    HTMLElement: class {},
    customElements: {
      get: () => undefined,
      define: (_, constructor) => {
        Card = constructor;
      },
    },
    document,
  },
);

function cardWithoutDom() {
  const card = Object.create(Card.prototype);
  card._selected = new Set();
  card.toggleAttribute = (name, force) => {
    card.fullViewAttribute = name === "full-view" && force;
  };
  card._tabs = { replaceChildren() {}, append() {} };
  card._resetMap = () => {};
  card._render = () => {};
  card._loadRooms = () => {};
  return card;
}

test("configuration needs a vacuum and map, with optional extras", () => {
  const card = cardWithoutDom();
  assert.throws(() => card.setConfig({ vacuums: [] }));
  assert.throws(() =>
    card.setConfig({ vacuums: [{ entity: "light.robot", map: "image.map" }] }),
  );
  assert.throws(() =>
    card.setConfig({
      vacuums: [{ entity: "vacuum.robot", map: "sensor.map" }],
    }),
  );
  assert.throws(() =>
    card.setConfig({
      vacuums: [{ entity: "vacuum.robot", map: "image.map" }],
      maintenance: {
        entity: "sensor.upkeep",
        navigation_path: "https://example.com",
      },
    }),
  );
  card.setConfig({ vacuums: [{ entity: "vacuum.robot", map: "image.map" }] });
  assert.equal(card._config.vacuums[0].entity, "vacuum.robot");
  assert.equal(card.fullViewAttribute, false);
  card.setConfig({
    full_view: true,
    vacuums: [{ entity: "vacuum.robot", map: "image.map" }],
  });
  assert.equal(card.fullViewAttribute, true);
  card.setConfig({ vacuums: [{ entity: "vacuum.robot", map: "image.map" }] });
  assert.equal(card.fullViewAttribute, false);
  assert.throws(() =>
    card.setConfig({
      full_view: "true",
      vacuums: [{ entity: "vacuum.robot", map: "image.map" }],
    }),
  );
});

test("rooms come from the vacuum mapping and Home Assistant areas", async () => {
  const card = Object.create(Card.prototype);
  const calls = [];
  card._config = { vacuums: [{ entity: "vacuum.robot" }] };
  card._hass = {
    callWS: async (request) => {
      calls.push(request.type);
      return request.type === "config/area_registry/list"
        ? [
            { area_id: "study", name: "Study" },
            { area_id: "kitchen", name: "Kitchen", icon: "mdi:stove" },
          ]
        : {
            options: {
              vacuum: { area_mapping: { study: 1, kitchen: 2, old_room: 3 } },
            },
          };
    },
  };
  card._request = 0;
  card._loading = false;
  card._roomsError = false;
  card._setFeedback = () => {};
  let renders = 0;
  card._renderRooms = () => {
    renders++;
  };

  await card._loadRooms();

  assert.deepEqual(calls, [
    "config/area_registry/list",
    "config/entity_registry/get",
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(card._metadata)), [
    [
      { id: "kitchen", name: "Kitchen", icon: "mdi:stove" },
      { id: "study", name: "Study", icon: "mdi:home-outline" },
    ],
  ]);
  assert.equal(renders, 1);
});

test("a pending clean request holds the current vacuum and selection", () => {
  const card = cardWithoutDom();
  card._index = 0;
  card._busy = true;
  card._selected.add("kitchen");
  card._setFeedback = () => {};

  card._selectVacuum(1);
  assert.equal(card._index, 0);
  assert.deepEqual([...card._selected], ["kitchen"]);

  card._busy = false;
  card._selectVacuum(1);
  assert.equal(card._index, 1);
  assert.equal(card._selected.size, 0);
});

test("cleaning sends only selected mapped area IDs to the chosen vacuum", async () => {
  const card = Object.create(Card.prototype);
  card._config = { vacuums: [{ entity: "vacuum.robot" }] };
  card._index = 0;
  card._selected = new Set(["kitchen", "study"]);
  card._busy = false;
  card._renderRooms = () => {};
  let action;
  let feedback;
  card._hass = {
    callService: async (...args) => {
      action = args;
    },
  };
  card._setFeedback = (message, error) => {
    feedback = { message, error };
  };

  await card._clean();

  assert.deepEqual(JSON.parse(JSON.stringify(action)), [
    "vacuum",
    "clean_area",
    { cleaning_area_id: ["kitchen", "study"] },
    { entity_id: "vacuum.robot" },
  ]);
  assert.equal(card._selected.size, 0);
  assert.equal(card._busy, false);
  assert.equal(feedback.message, "Cleaning 2 rooms requested.");
});

test("a failed cleaning request leaves the selection available to retry", async () => {
  const card = Object.create(Card.prototype);
  card._config = { vacuums: [{ entity: "vacuum.robot" }] };
  card._index = 0;
  card._selected = new Set(["kitchen"]);
  card._renderRooms = () => {};
  card._hass = {
    callService: async () => {
      throw new Error("offline");
    },
  };
  let feedback;
  card._setFeedback = (message, error) => {
    feedback = { message, error };
  };

  await card._clean();

  assert.deepEqual([...card._selected], ["kitchen"]);
  assert.equal(card._busy, false);
  assert.equal(feedback.error, true);
});
