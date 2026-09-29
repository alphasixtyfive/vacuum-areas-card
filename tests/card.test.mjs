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
  card._jobs = new Map();
  card.toggleAttribute = (name, force) => {
    card.fullViewAttribute = name === "full-view" && force;
  };
  card._tabs = { replaceChildren() {}, append() {} };
  card._resetMap = () => {};
  card._render = () => {};
  card._loadRooms = () => {};
  return card;
}

function cardWithControls(state, selected = []) {
  const card = Object.create(Card.prototype);
  const vacuum = "vacuum.robot";
  card._config = { vacuums: [{ entity: vacuum }] };
  card._index = 0;
  card._busy = false;
  card._hass = {
    states: {
      [vacuum]: { state, attributes: { supported_features: 30524 } },
    },
  };
  card._selected = new Set(selected);
  card._jobs = new Map();
  card._metadata = [[{ id: "kitchen" }]];
  card._rooms = { querySelectorAll: () => [] };
  card._tabs = { children: [] };
  card._selectionToggle = {};
  card._selectionIcon = {};
  card._selectionLabel = {};
  card._start = {};
  card._startIcon = {};
  card._startLabel = {};
  card._stop = {};
  card._dock = {};
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

test("one failed vacuum mapping leaves other rooms available until retry", async () => {
  const card = Object.create(Card.prototype);
  card._config = {
    vacuums: [{ entity: "vacuum.downstairs" }, { entity: "vacuum.upstairs" }],
  };
  card._request = 0;
  card._loading = false;
  card._roomsError = false;
  card._renderRooms = () => {};
  card._setFeedback = () => {};
  let failed = true;
  let calls = 0;
  card._hass = {
    callWS: async (request) => {
      calls++;
      if (request.type === "config/area_registry/list")
        return [{ area_id: "kitchen", name: "Kitchen" }];
      if (failed && request.entity_id === "vacuum.downstairs")
        throw new Error("registry unavailable");
      return { options: { vacuum: { area_mapping: { kitchen: 1 } } } };
    },
  };

  await card._loadRooms();
  assert.equal(card._metadata[0], null);
  assert.equal(card._metadata[1][0].name, "Kitchen");
  await card._loadRooms();
  assert.equal(calls, 3);

  failed = false;
  await card._retryRooms();
  assert.equal(card._metadata[0][0].name, "Kitchen");
});

test("failed area lookup waits for an explicit retry", async () => {
  const card = Object.create(Card.prototype);
  card._config = { vacuums: [{ entity: "vacuum.robot" }] };
  card._request = 0;
  card._loading = false;
  card._roomsError = false;
  card._renderRooms = () => {};
  card._setFeedback = () => {};
  let failed = true;
  let calls = 0;
  card._hass = {
    callWS: async (request) => {
      calls++;
      if (request.type === "config/area_registry/list") {
        if (failed) throw new Error("offline");
        return [{ area_id: "kitchen", name: "Kitchen" }];
      }
      return { options: { vacuum: { area_mapping: { kitchen: 1 } } } };
    },
  };

  await card._loadRooms();
  assert.equal(card._roomsError, true);
  await card._loadRooms();
  assert.equal(calls, 2);

  failed = false;
  await card._retryRooms();
  assert.equal(card._roomsError, false);
  assert.equal(card._metadata[0][0].name, "Kitchen");
});

test("a failed map can retry the same entity picture", () => {
  const card = Object.create(Card.prototype);
  const attributes = new Map();
  card._config = {
    vacuums: [{ name: "Robot", entity: "vacuum.robot", map: "image.map" }],
  };
  card._index = 0;
  card._hass = {
    states: {
      "vacuum.robot": { state: "idle" },
      "image.map": {
        state: "2026-09-29T10:00:00",
        attributes: { entity_picture: "/api/image_proxy/map" },
      },
    },
  };
  card._tabs = { children: [] };
  card._body = { setAttribute() {} };
  card._statusName = {};
  card._statusDetail = {};
  card._maintenance = {};
  card._map = {
    getAttribute: (name) => attributes.get(name),
    removeAttribute: (name) => attributes.delete(name),
    set src(value) {
      attributes.set("src", value);
    },
  };
  card._mapEmpty = {};
  card._mapRetryButton = {};
  card._mapViewer = { setAttribute() {} };
  card._mapBaseSrc = "";
  card._mapRetry = 0;
  card._renderRooms = () => {};

  card._render();
  const firstSrc = attributes.get("src");
  card._failedMapSrc = firstSrc;
  card._render();
  assert.equal(card._map.hidden, true);
  assert.equal(card._mapRetryButton.hidden, false);

  card._retryMap();
  assert.equal(card._map.hidden, false);
  assert.equal(card._mapRetryButton.hidden, true);
  assert.equal(attributes.get("src"), `${firstSrc}&retry=1`);
});

test("map gestures leave retry controls and failed maps alone", () => {
  const card = Object.create(Card.prototype);
  let captures = 0;
  card._map = { hidden: false, getAttribute: () => "/api/image_proxy/map" };
  card._mapViewer = { setPointerCapture: () => captures++ };
  card._pointers = new Map();
  card._zoom = 1;
  card._pan = { x: 0, y: 0 };
  const pointer = {
    pointerId: 1,
    pointerType: "touch",
    clientX: 12,
    clientY: 18,
    target: { closest: () => ({ tagName: "BUTTON" }) },
  };

  card._pointerDown(pointer);
  assert.equal(captures, 0);
  assert.equal(card._pointers.size, 0);

  pointer.target.closest = () => null;
  card._map.hidden = true;
  card._pointerDown(pointer);
  assert.equal(captures, 0);

  card._map.hidden = false;
  card._pointerDown(pointer);
  assert.equal(captures, 1);
  assert.equal(card._pointers.size, 1);
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
  card._jobs = new Map();
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

  await card._perform("clean_area");

  assert.deepEqual(JSON.parse(JSON.stringify(action)), [
    "vacuum",
    "clean_area",
    { cleaning_area_id: ["kitchen", "study"] },
    { entity_id: "vacuum.robot" },
  ]);
  assert.equal(card._selected.size, 0);
  assert.deepEqual(
    [...card._jobs.get("vacuum.robot").areas],
    ["kitchen", "study"],
  );
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

  await card._perform("clean_area");

  assert.deepEqual([...card._selected], ["kitchen"]);
  assert.equal(card._busy, false);
  assert.equal(feedback.error, true);
});

test("only rooms requested by this card stay highlighted during a job", () => {
  const card = cardWithControls("cleaning", ["kitchen"]);
  const room = {
    dataset: { areaId: "kitchen" },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  card._rooms.querySelectorAll = () => [room];

  card._updateSelection();
  assert.equal(room["aria-pressed"], "false");

  card._selected.clear();
  card._jobs.set("vacuum.robot", {
    areas: new Set(["kitchen"]),
    requestedAt: Date.now(),
    running: false,
  });
  card._updateSelection();
  assert.equal(room["aria-pressed"], "true");
  assert.equal(room.disabled, true);
  assert.equal(card._jobs.get("vacuum.robot").running, true);

  card._hass.states["vacuum.robot"].state = "paused";
  card._updateSelection();
  assert.equal(room["aria-pressed"], "true");

  card._hass.states["vacuum.robot"].state = "idle";
  card._updateSelection();
  assert.equal(room["aria-pressed"], "false");
  assert.equal(card._jobs.has("vacuum.robot"), false);
});

test("an unstarted room request cannot mark a later clean", () => {
  const card = cardWithControls("idle");
  const room = {
    dataset: { areaId: "kitchen" },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  card._rooms.querySelectorAll = () => [room];
  card._jobs.set("vacuum.robot", {
    areas: new Set(["kitchen"]),
    requestedAt: Date.now() - 31_000,
    running: false,
  });

  card._hass.states["vacuum.robot"].state = "cleaning";
  card._updateSelection();
  assert.equal(card._jobs.has("vacuum.robot"), false);
  assert.equal(room["aria-pressed"], "false");
});

test("the primary control follows the vacuum state", () => {
  const card = cardWithControls("docked");
  card._updateSelection();
  assert.equal(card._primaryAction, "start");
  assert.equal(card._startLabel.textContent, "Clean all rooms");
  assert.equal(card._start.disabled, false);
  assert.equal(card._stop.hidden, true);
  assert.equal(card._dock.hidden, true);

  card._selected.add("kitchen");
  card._updateSelection();
  assert.equal(card._primaryAction, "clean_area");
  assert.equal(card._startLabel.textContent, "Clean 1 room");
  assert.equal(card._start.disabled, false);

  card._hass.states["vacuum.robot"].state = "cleaning";
  card._updateSelection();
  assert.equal(card._primaryAction, "pause");
  assert.equal(card._startLabel.textContent, "Pause");
  assert.equal(card._start.disabled, false);
  assert.equal(card._stop.hidden, false);
  assert.equal(card._stop.disabled, false);
  assert.equal(card._dock.hidden, false);
  assert.equal(card._dock.disabled, false);
  assert.equal(card._selectionToggle.hidden, true);

  card._hass.states["vacuum.robot"].state = "paused";
  card._updateSelection();
  assert.equal(card._primaryAction, "start");
  assert.equal(card._startLabel.textContent, "Resume cleaning");
  assert.equal(card._start.disabled, false);
  assert.equal(card._stop.hidden, false);
  assert.equal(card._selectionToggle.hidden, true);

  card._hass.states["vacuum.robot"].state = "idle";
  card._updateSelection();
  assert.equal(card._stop.hidden, true);
  assert.equal(card._selectionToggle.hidden, false);
  assert.equal(card._primaryAction, "clean_area");

  card._hass.states["vacuum.robot"].state = "returning";
  card._updateSelection();
  assert.equal(card._startLabel.textContent, "Returning to dock");
  assert.equal(card._start.disabled, true);
  assert.equal(card._stop.hidden, true);
  assert.equal(card._dock.hidden, true);

  card._hass.states["vacuum.robot"].state = "cleaning";
  card._hass.states["vacuum.robot"].attributes.supported_features = 0;
  card._updateSelection();
  assert.equal(card._start.disabled, true);
  assert.equal(card._stop.hidden, true);
  assert.equal(card._dock.hidden, true);
});

test("vacuum controls use Home Assistant actions for the selected robot", async () => {
  const card = cardWithControls("paused");
  const calls = [];
  const feedback = [];
  card._hass.callService = async (...args) => calls.push(args);
  card._renderRooms = () => {};
  card._setFeedback = (message) => feedback.push(message);

  await card._perform("start");
  await card._perform("pause");
  await card._perform("stop");
  await card._perform("return_to_base");

  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [
    ["vacuum", "start", {}, { entity_id: "vacuum.robot" }],
    ["vacuum", "pause", {}, { entity_id: "vacuum.robot" }],
    ["vacuum", "stop", {}, { entity_id: "vacuum.robot" }],
    ["vacuum", "return_to_base", {}, { entity_id: "vacuum.robot" }],
  ]);
  assert.deepEqual(feedback, [
    "Resume requested.",
    "Pause requested.",
    "Stop requested. Choose rooms when the vacuum is idle.",
    "Return to dock requested.",
  ]);
  assert.equal(card._busy, false);
});
