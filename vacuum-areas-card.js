/* Generated from src/. Edit the source files, then run npm run build. */
(() => {
  // src/styles.css
  var styles_default = ':host {\n  display: block;\n  min-width: 0;\n  width: calc(100% - 32px);\n  margin: 16px auto;\n  container-type: inline-size;\n}\n:host([full-view]) {\n  width: 100%;\n  margin: 0;\n}\n[hidden] {\n  display: none !important;\n}\nha-card {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  height: calc(100dvh - 88px);\n  overflow: hidden;\n}\n:host([full-view]) ha-card {\n  height: calc(100dvh - var(--header-height, 56px));\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.48;\n}\nbutton:focus-visible {\n  outline: 2px solid var(--primary-color);\n  outline-offset: 2px;\n}\n.tabs {\n  display: flex;\n  gap: 4px;\n  padding: 8px 16px 0;\n  border-bottom: 1px solid var(--divider-color);\n}\n.tab {\n  min-height: 44px;\n  padding: 0 16px;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  background: transparent;\n  color: var(--secondary-text-color);\n  font-weight: 500;\n}\n.tab[aria-selected="true"] {\n  color: var(--primary-text-color);\n  border-bottom-color: var(--primary-color);\n}\n.body {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) clamp(340px, 38%, 440px);\n  flex: 1;\n  min-height: 0;\n  gap: 0;\n}\n.map {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  min-width: 0;\n  padding: 12px;\n  overflow: hidden;\n  background: var(--card-background-color);\n}\n:host([full-view]) .map {\n  padding: 0;\n}\n.map-viewer {\n  --base-scale: 1;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border-radius: var(--ha-border-radius-md, 12px);\n  overflow: hidden;\n  background: var(--primary-background-color);\n  touch-action: pan-y;\n}\n:host([full-view]) .map-viewer {\n  border-radius: 0;\n}\n.map-viewer:focus-visible {\n  outline: 2px solid var(--primary-color);\n  outline-offset: -2px;\n}\n.map-viewer.zoomed {\n  touch-action: none;\n  cursor: grab;\n}\n.map-viewer.zoomed:active {\n  cursor: grabbing;\n}\n.map img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  user-select: none;\n  -webkit-user-drag: none;\n}\n.map-empty {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  color: var(--secondary-text-color);\n}\n.panel {\n  min-width: 0;\n  padding: 20px;\n  border-left: 1px solid var(--divider-color);\n  display: flex;\n  flex-direction: column;\n}\n.status {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.status ha-icon {\n  color: var(--primary-color);\n  --mdc-icon-size: 24px;\n  width: 36px;\n  height: 36px;\n  flex: 0 0 36px;\n  display: grid;\n  place-items: center;\n}\n.status-copy {\n  min-width: 0;\n  flex: 1;\n}\n.status strong {\n  display: block;\n  font-size: 16px;\n  line-height: 24px;\n}\n.status span {\n  color: var(--secondary-text-color);\n  line-height: 22px;\n}\n.maintenance {\n  min-width: 44px;\n  height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  border: 1px solid var(--warning-color, #ff9800);\n  border-radius: var(--ha-border-radius-md, 12px);\n  background: color-mix(\n    in srgb,\n    var(--warning-color, #ff9800) 12%,\n    var(--card-background-color)\n  );\n  color: var(--warning-color, #ff9800);\n}\n.maintenance ha-icon {\n  width: auto;\n  height: auto;\n  flex: none;\n  border-radius: 0;\n  background: transparent;\n  color: inherit;\n  --mdc-icon-size: 20px;\n}\n.maintenance span {\n  color: inherit;\n  font-size: 13px;\n  font-weight: 600;\n}\n.rooms-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.rooms-head strong {\n  font-size: 16px;\n}\n.selection-toggle {\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  border: 0;\n  border-radius: var(--ha-border-radius-md, 12px);\n  background: var(\n    --ha-color-fill-neutral-quiet-resting,\n    var(--secondary-background-color)\n  );\n  color: var(--primary-text-color);\n  padding: 0 10px;\n  font-size: 13px;\n  white-space: nowrap;\n}\n.selection-toggle ha-icon {\n  --mdc-icon-size: 17px;\n}\n.selection-toggle:hover:not(:disabled),\n.quick-controls button:hover:not(:disabled) {\n  background: var(\n    --ha-color-fill-neutral-quiet-hover,\n    var(--secondary-background-color)\n  );\n}\n.rooms {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n.room {\n  position: relative;\n  min-width: 0;\n  min-height: 64px;\n  box-sizing: border-box;\n  border: 1px solid transparent;\n  border-radius: var(--ha-border-radius-md, 12px);\n  padding: 8px 10px;\n  background: var(\n    --ha-color-fill-neutral-quiet-resting,\n    var(--secondary-background-color)\n  );\n  color: var(--primary-text-color);\n  text-align: left;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.room:hover {\n  background: var(\n    --ha-color-fill-neutral-quiet-hover,\n    var(--secondary-background-color)\n  );\n}\n.room[aria-pressed="true"] {\n  border-color: var(--primary-color);\n  background: color-mix(\n    in srgb,\n    var(--primary-color) 12%,\n    var(--card-background-color)\n  );\n}\n.room-icon {\n  display: grid;\n  place-items: center;\n  width: 36px;\n  height: 36px;\n  flex: 0 0 36px;\n  border-radius: 50%;\n  background: var(--card-background-color);\n  color: var(--primary-color);\n}\n.room-icon ha-icon {\n  --mdc-icon-size: 20px;\n}\n.room[aria-pressed="true"] .room-icon {\n  background: color-mix(\n    in srgb,\n    var(--primary-color) 18%,\n    var(--card-background-color)\n  );\n  color: var(--primary-color);\n}\n.room-name {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 17px;\n  overflow-wrap: anywhere;\n}\n.room-check {\n  position: absolute;\n  top: 4px;\n  left: 34px;\n  color: var(--primary-color);\n  --mdc-icon-size: 18px;\n}\n.room[aria-pressed="false"] .room-check {\n  display: none;\n}\n.hint {\n  color: var(--secondary-text-color);\n  line-height: 22px;\n}\n.actions {\n  display: grid;\n  gap: 8px;\n  margin-top: 0;\n  padding-top: 20px;\n}\n.quick-controls {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n}\n.actions button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  min-width: 0;\n  min-height: 48px;\n  border-radius: var(--ha-border-radius-md, 12px);\n  padding: 0 8px;\n  white-space: nowrap;\n}\n.actions ha-icon {\n  --mdc-icon-size: 18px;\n}\n.quick-controls button {\n  border: 0;\n  color: var(--primary-text-color);\n  background: var(\n    --ha-color-fill-neutral-quiet-resting,\n    var(--secondary-background-color)\n  );\n  gap: 5px;\n  padding: 0 4px;\n  font-size: 13px;\n}\n.start {\n  border: 0;\n  background: var(--primary-color);\n  color: var(--text-primary-color, white);\n  font-weight: 600;\n}\n.feedback {\n  min-height: 22px;\n  margin-top: 8px;\n  color: var(--secondary-text-color);\n  font-size: 13px;\n}\n.feedback:empty {\n  display: none;\n}\n.feedback.error {\n  color: var(--error-color);\n}\n@container (max-width: 720px) {\n  ha-card,\n  :host([full-view]) ha-card {\n    height: auto;\n  }\n  .body {\n    display: flex;\n    flex: none;\n    flex-direction: column;\n    min-height: auto;\n  }\n  .map {\n    height: clamp(280px, 40dvh, 360px);\n  }\n  .map-viewer {\n    --base-scale: 1.2;\n  }\n  .panel {\n    border-left: 0;\n    border-top: 1px solid var(--divider-color);\n    padding: 16px;\n  }\n  .status {\n    margin-bottom: 16px;\n  }\n  .rooms-head {\n    margin-bottom: 8px;\n  }\n  .rooms {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .room {\n    min-height: 60px;\n  }\n  .room-icon {\n    width: 32px;\n    height: 32px;\n    flex: 0 0 32px;\n  }\n  .room-icon ha-icon {\n    --mdc-icon-size: 18px;\n  }\n  .room-name {\n    line-height: 16px;\n  }\n  .room-check {\n    left: 30px;\n    --mdc-icon-size: 14px;\n  }\n  .actions {\n    padding-top: 16px;\n  }\n}\n@container (max-width: 340px) {\n  .rooms {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-height: 700px) {\n  @container (min-width: 721px) {\n    .panel {\n      padding: 16px;\n    }\n    .status {\n      margin-bottom: 12px;\n    }\n    .rooms-head {\n      margin-bottom: 8px;\n    }\n    .room {\n      min-height: 60px;\n    }\n    .room-icon {\n      width: 28px;\n      height: 28px;\n    }\n    .room-icon ha-icon {\n      --mdc-icon-size: 18px;\n    }\n    .actions {\n      padding-top: 12px;\n    }\n  }\n}\n@container (min-width: 721px) {\n  .map-viewer {\n    --base-scale: 1.1;\n  }\n}\n@container (min-width: 1700px) {\n  .map-viewer {\n    --base-scale: 1.3;\n  }\n}\n';

  // src/card.js
  var VACUUM_FEATURE = {
    PAUSE: 4,
    RETURN_HOME: 16,
    START: 8192,
    CLEAN_AREA: 16384
  };
  var VacuumAreasCard = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._index = 0;
      this._selected = /* @__PURE__ */ new Set();
      this._metadata = null;
      this._roomsError = false;
      this._roomKey = null;
      this._request = 0;
      this._loading = false;
      this._busy = false;
      this.shadowRoot.innerHTML = `
        <style>${styles_default}</style>
        <ha-card>
          <div class="tabs" role="tablist" aria-label="Vacuums"></div>
          <div class="body" id="vacuum-panel" role="tabpanel">
            <div class="map">
              <div class="map-viewer" role="group" aria-label="Vacuum map. Pinch to zoom." tabindex="0">
                <img alt="" hidden>
                <span class="map-empty">Map unavailable</span>
              </div>
            </div>
            <div class="panel">
              <div class="status">
                <ha-icon icon="mdi:robot-vacuum"></ha-icon>
                <div class="status-copy"><strong></strong><span></span></div>
                <button class="maintenance" type="button" hidden>
                  <ha-icon icon="mdi:robot-vacuum-alert" aria-hidden="true"></ha-icon>
                  <span></span>
                </button>
              </div>
              <div class="rooms-head">
                <strong>Rooms</strong>
                <button class="selection-toggle" type="button">
                  <ha-icon icon="mdi:select-all" aria-hidden="true"></ha-icon>
                  <span>Select all</span>
                </button>
              </div>
              <div class="rooms"></div>
              <div class="actions">
                <button class="start" type="button">
                  <ha-icon icon="mdi:play" aria-hidden="true"></ha-icon>
                  <span>Clean rooms</span>
                </button>
                <div class="quick-controls">
                  <button class="clean-all" type="button">
                    <ha-icon icon="mdi:robot-vacuum" aria-hidden="true"></ha-icon>
                    <span>Clean all</span>
                  </button>
                  <button class="dock" type="button">
                    <ha-icon icon="mdi:home-import-outline" aria-hidden="true"></ha-icon>
                    <span>Dock</span>
                  </button>
                  <button class="details" type="button">
                    <ha-icon icon="mdi:dots-horizontal" aria-hidden="true"></ha-icon>
                    <span>More</span>
                  </button>
                </div>
              </div>
              <div class="feedback" role="status" aria-live="polite"></div>
            </div>
          </div>
        </ha-card>`;
      this._tabs = this.shadowRoot.querySelector(".tabs");
      this._body = this.shadowRoot.querySelector(".body");
      this._mapViewer = this.shadowRoot.querySelector(".map-viewer");
      this._map = this.shadowRoot.querySelector(".map img");
      this._mapEmpty = this.shadowRoot.querySelector(".map-empty");
      this._map.addEventListener("error", () => {
        this._failedMapSrc = this._map.getAttribute("src");
        this._map.hidden = true;
        this._mapEmpty.hidden = false;
      });
      this._zoom = 1;
      this._pan = { x: 0, y: 0 };
      this._pointers = /* @__PURE__ */ new Map();
      this._onResize = () => this._applyMapTransform();
      this._statusName = this.shadowRoot.querySelector(".status strong");
      this._statusDetail = this.shadowRoot.querySelector(".status span");
      this._maintenance = this.shadowRoot.querySelector(".maintenance");
      this._maintenanceCount = this._maintenance.querySelector("span");
      this._rooms = this.shadowRoot.querySelector(".rooms");
      this._selectionToggle = this.shadowRoot.querySelector(".selection-toggle");
      this._selectionIcon = this._selectionToggle.querySelector("ha-icon");
      this._selectionLabel = this._selectionToggle.querySelector("span");
      this._start = this.shadowRoot.querySelector(".start");
      this._startIcon = this._start.querySelector("ha-icon");
      this._startLabel = this._start.querySelector("span");
      this._cleanAll = this.shadowRoot.querySelector(".clean-all");
      this._dock = this.shadowRoot.querySelector(".dock");
      this._feedback = this.shadowRoot.querySelector(".feedback");
      this._maintenance.addEventListener("click", () => {
        const path = this._config.maintenance?.navigation_path;
        if (!path || window.location.pathname === path) return;
        const from = window.location.pathname + window.location.search + window.location.hash;
        window.history.pushState({ from }, "", path);
        window.dispatchEvent(
          new CustomEvent("location-changed", {
            bubbles: true,
            composed: true,
            detail: { replace: false }
          })
        );
      });
      this._mapViewer.addEventListener(
        "pointerdown",
        (event) => this._pointerDown(event)
      );
      this._mapViewer.addEventListener(
        "pointermove",
        (event) => this._pointerMove(event)
      );
      this._mapViewer.addEventListener(
        "pointerup",
        (event) => this._pointerUp(event)
      );
      this._mapViewer.addEventListener(
        "pointercancel",
        (event) => this._pointerUp(event)
      );
      this._mapViewer.addEventListener("dblclick", () => this._resetMap());
      this._mapViewer.addEventListener(
        "wheel",
        (event) => {
          if (!event.ctrlKey || !this._map.getAttribute("src")) return;
          event.preventDefault();
          this._zoomAt(
            event.clientX,
            event.clientY,
            Math.exp(-event.deltaY / 300)
          );
        },
        { passive: false }
      );
      this._mapViewer.addEventListener("keydown", (event) => {
        if (event.key === "0") this._resetMap();
        else if (event.key === "+" || event.key === "=")
          this._zoomAt(null, null, 1.35);
        else if (event.key === "-") this._zoomAt(null, null, 1 / 1.35);
        else return;
        event.preventDefault();
      });
      this._selectionToggle.addEventListener("click", () => {
        const rooms = this._metadata?.[this._index] || [];
        if (this._selected.size) this._selected.clear();
        else this._selected = new Set(rooms.map((room) => room.id));
        this._setFeedback("");
        this._updateSelection();
      });
      this._start.addEventListener(
        "click",
        () => this._perform(this._primaryAction)
      );
      this._cleanAll.addEventListener("click", () => this._perform("start"));
      this._dock.addEventListener("click", () => this._perform("return_to_base"));
      this.shadowRoot.querySelector(".details").addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId: this._config.vacuums[this._index].entity }
          })
        );
      });
    }
    setConfig(config) {
      const validVacuum = (item) => item && typeof item.entity === "string" && item.entity.startsWith("vacuum.") && typeof item.map === "string" && item.map.startsWith("image.") && (item.battery === void 0 || typeof item.battery === "string") && (item.name === void 0 || typeof item.name === "string");
      if (!Array.isArray(config?.vacuums) || !config.vacuums.length || !config.vacuums.every(validVacuum)) {
        throw new Error("vacuum-areas-card needs vacuums with entity and map.");
      }
      if (config.maintenance && (typeof config.maintenance.entity !== "string" || typeof config.maintenance.navigation_path !== "string" || !/^\/(?!\/)/.test(config.maintenance.navigation_path))) {
        throw new Error("maintenance needs an entity and local navigation_path.");
      }
      if (config.full_view !== void 0 && typeof config.full_view !== "boolean") {
        throw new Error("full_view must be a boolean.");
      }
      this._config = config;
      this.toggleAttribute("full-view", config.full_view === true);
      this._index = 0;
      this._selected.clear();
      this._resetMap();
      this._metadata = null;
      this._roomsError = false;
      this._roomKey = null;
      this._request++;
      this._loading = false;
      this._tabs.replaceChildren();
      config.vacuums.forEach((item, index) => {
        const tab = document.createElement("button");
        tab.type = "button";
        tab.className = "tab";
        tab.setAttribute("role", "tab");
        tab.id = `vacuum-tab-${index}`;
        tab.setAttribute("aria-controls", "vacuum-panel");
        tab.textContent = item.name || item.entity;
        tab.addEventListener("click", () => this._selectVacuum(index));
        tab.addEventListener("keydown", (event) => {
          const count = this._config.vacuums.length;
          const next = event.key === "ArrowRight" ? (index + 1) % count : event.key === "ArrowLeft" ? (index - 1 + count) % count : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : null;
          if (next === null) return;
          event.preventDefault();
          this._selectVacuum(next);
          this._tabs.children[next].focus();
        });
        this._tabs.append(tab);
      });
      this._render();
      this._loadRooms();
    }
    set hass(hass) {
      if (this._hass?.connection !== hass?.connection) {
        this._metadata = null;
        this._roomsError = false;
        this._roomKey = null;
        this._request++;
        this._loading = false;
      }
      this._hass = hass;
      this._render();
      this._loadRooms();
    }
    connectedCallback() {
      window.addEventListener("resize", this._onResize);
      this._applyMapTransform();
    }
    disconnectedCallback() {
      window.removeEventListener("resize", this._onResize);
    }
    getCardSize() {
      return 8;
    }
    getGridOptions() {
      return { columns: "full" };
    }
    _selectVacuum(index) {
      if (this._busy || index === this._index) return;
      this._index = index;
      this._selected.clear();
      this._resetMap();
      this._setFeedback("");
      this._render();
    }
    async _loadRooms() {
      if (!this._config || !this._hass?.callWS || this._metadata || this._loading)
        return;
      const request = ++this._request;
      this._loading = true;
      try {
        const [areas, ...entries] = await Promise.all([
          this._hass.callWS({ type: "config/area_registry/list" }),
          ...this._config.vacuums.map(
            (item) => this._hass.callWS({
              type: "config/entity_registry/get",
              entity_id: item.entity
            })
          )
        ]);
        if (request !== this._request) return;
        const names = new Map(
          areas.map((area) => [
            area.area_id,
            { name: area.name, icon: area.icon || "mdi:home-outline" }
          ])
        );
        this._metadata = entries.map(
          (entry) => Object.keys(entry.options?.vacuum?.area_mapping || {}).filter((id) => names.has(id)).map((id) => ({ id, ...names.get(id) })).sort((a, b) => a.name.localeCompare(b.name))
        );
        this._roomsError = false;
        this._setFeedback("");
      } catch (_) {
        if (request === this._request) {
          this._roomsError = true;
          this._setFeedback("Rooms unavailable. Check the robot controls.", true);
        }
      } finally {
        if (request === this._request) {
          this._loading = false;
          this._renderRooms();
        }
      }
    }
    _label(item) {
      return item.name || this._hass?.states?.[item.entity]?.attributes?.friendly_name || item.entity;
    }
    _render() {
      if (!this._config) return;
      const item = this._config.vacuums[this._index];
      [...this._tabs.children].forEach((tab, index) => {
        tab.setAttribute("aria-selected", String(index === this._index));
        tab.tabIndex = index === this._index ? 0 : -1;
        tab.textContent = this._label(this._config.vacuums[index]);
      });
      this._body.setAttribute("aria-labelledby", `vacuum-tab-${this._index}`);
      const state = this._hass?.states?.[item.entity];
      const battery = this._hass?.states?.[item.battery]?.state;
      const detail = state?.state && !["unknown", "unavailable"].includes(state.state) ? state.state.replaceAll("_", " ").replace(/^./, (char) => char.toUpperCase()) : "Unavailable";
      this._statusName.textContent = detail;
      this._statusDetail.textContent = /^\d+(\.\d+)?$/.test(battery || "") ? `${Math.round(Number(battery))}% battery` : item.battery ? "Battery unavailable" : "";
      const upkeep = this._config.maintenance;
      const upkeepCount = Number(this._hass?.states?.[upkeep?.entity]?.state);
      this._maintenance.hidden = !upkeep || !Number.isFinite(upkeepCount) || upkeepCount <= 0;
      if (!this._maintenance.hidden) {
        this._maintenanceCount.textContent = String(upkeepCount);
        this._maintenance.setAttribute(
          "aria-label",
          `${upkeepCount} vacuum upkeep ${upkeepCount === 1 ? "item" : "items"}`
        );
        this._maintenance.title = "Vacuum upkeep";
      }
      const map = this._hass?.states?.[item.map];
      const picture = map?.attributes?.entity_picture;
      const src = picture ? picture + (picture.includes("?") ? "&" : "?") + "state=" + encodeURIComponent(map.state) : "";
      if (src && this._map.getAttribute("src") !== src) this._map.src = src;
      if (!src) this._map.removeAttribute("src");
      const hasMap = !!src && src !== this._failedMapSrc;
      this._map.hidden = !hasMap;
      this._mapEmpty.hidden = hasMap;
      this._mapViewer.tabIndex = hasMap ? 0 : -1;
      this._mapViewer.setAttribute(
        "aria-label",
        `${this._label(item)} map. Pinch to zoom; double tap to reset.`
      );
      this._renderRooms();
    }
    _point(x, y) {
      const rect = this._mapViewer.getBoundingClientRect();
      return {
        x: x - rect.left - rect.width / 2,
        y: y - rect.top - rect.height / 2
      };
    }
    _startPinch() {
      const [a, b] = [...this._pointers.values()];
      const first = this._point(a.x, a.y);
      const second = this._point(b.x, b.y);
      this._pinch = {
        distance: Math.hypot(first.x - second.x, first.y - second.y),
        zoom: this._zoom,
        pan: { ...this._pan },
        center: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
      };
    }
    _pointerDown(event) {
      if (!this._map.getAttribute("src") || event.pointerType === "mouse" && event.button !== 0)
        return;
      this._mapViewer.setPointerCapture(event.pointerId);
      this._pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this._pointers.size === 2) this._startPinch();
      else
        this._drag = {
          x: event.clientX,
          y: event.clientY,
          pan: { ...this._pan }
        };
    }
    _pointerMove(event) {
      if (!this._pointers.has(event.pointerId)) return;
      this._pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this._pointers.size === 2 && this._pinch?.distance) {
        const [a, b] = [...this._pointers.values()];
        const first = this._point(a.x, a.y);
        const second = this._point(b.x, b.y);
        const center = {
          x: (first.x + second.x) / 2,
          y: (first.y + second.y) / 2
        };
        this._zoom = Math.max(
          1,
          Math.min(
            3,
            this._pinch.zoom * Math.hypot(first.x - second.x, first.y - second.y) / this._pinch.distance
          )
        );
        const ratio = this._zoom / this._pinch.zoom;
        this._pan = {
          x: center.x + (this._pinch.pan.x - this._pinch.center.x) * ratio,
          y: center.y + (this._pinch.pan.y - this._pinch.center.y) * ratio
        };
        this._applyMapTransform();
      } else if (this._pointers.size === 1 && this._zoom > 1) {
        this._pan = {
          x: this._drag.pan.x + event.clientX - this._drag.x,
          y: this._drag.pan.y + event.clientY - this._drag.y
        };
        this._applyMapTransform();
      }
    }
    _pointerUp(event) {
      this._pointers.delete(event.pointerId);
      this._pinch = null;
      const remaining = [...this._pointers.values()][0];
      if (remaining) this._drag = { ...remaining, pan: { ...this._pan } };
    }
    _zoomAt(clientX, clientY, factor) {
      const point = clientX === null ? { x: 0, y: 0 } : this._point(clientX, clientY);
      const previous = this._zoom;
      this._zoom = Math.max(1, Math.min(3, this._zoom * factor));
      const ratio = this._zoom / previous;
      this._pan = {
        x: point.x + (this._pan.x - point.x) * ratio,
        y: point.y + (this._pan.y - point.y) * ratio
      };
      this._applyMapTransform();
    }
    _resetMap() {
      this._zoom = 1;
      this._pan = { x: 0, y: 0 };
      this._pointers.clear();
      this._pinch = null;
      this._applyMapTransform();
    }
    _applyMapTransform() {
      const base = Number.parseFloat(
        getComputedStyle(this._mapViewer).getPropertyValue("--base-scale")
      ) || 1;
      const scale = base * this._zoom;
      if (this._zoom === 1) this._pan = { x: 0, y: 0 };
      const maxX = Math.max(0, (scale - 1) * this._mapViewer.clientWidth / 2);
      const maxY = Math.max(0, (scale - 1) * this._mapViewer.clientHeight / 2);
      this._pan.x = Math.max(-maxX, Math.min(maxX, this._pan.x));
      this._pan.y = Math.max(-maxY, Math.min(maxY, this._pan.y));
      this._map.style.transform = `translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale(${scale})`;
      this._mapViewer.classList.toggle("zoomed", this._zoom > 1.01);
    }
    _renderRooms() {
      const rooms = this._metadata?.[this._index] || [];
      const key = `${this._index}:${this._metadata ? "ready" : this._roomsError ? "error" : "loading"}`;
      if (key !== this._roomKey) {
        this._roomKey = key;
        this._rooms.replaceChildren();
        if (!rooms.length) {
          const hint = document.createElement("span");
          hint.className = "hint";
          hint.textContent = this._roomsError ? "Rooms unavailable" : this._metadata ? "No mapped rooms" : "Loading rooms\u2026";
          this._rooms.append(hint);
        }
        for (const room of rooms) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "room";
          button.dataset.areaId = room.id;
          const icon = document.createElement("span");
          icon.className = "room-icon";
          const glyph = document.createElement("ha-icon");
          glyph.icon = room.icon;
          glyph.setAttribute("aria-hidden", "true");
          icon.append(glyph);
          const name = document.createElement("span");
          name.className = "room-name";
          name.textContent = room.name;
          const check = document.createElement("ha-icon");
          check.className = "room-check";
          check.icon = "mdi:check-circle";
          check.setAttribute("aria-hidden", "true");
          button.append(icon, name, check);
          button.addEventListener("click", () => {
            if (this._selected.has(room.id)) this._selected.delete(room.id);
            else this._selected.add(room.id);
            this._setFeedback("");
            this._updateSelection();
          });
          this._rooms.append(button);
        }
      }
      this._updateSelection();
    }
    _updateSelection() {
      const vacuum = this._hass?.states?.[this._config.vacuums[this._index].entity];
      const state = vacuum?.state;
      const features = Number(vacuum?.attributes?.supported_features) || 0;
      const ready = state === "idle" || state === "docked";
      const action = state === "cleaning" ? "pause" : state === "paused" ? "start" : "clean_area";
      const feature = action === "pause" ? VACUUM_FEATURE.PAUSE : action === "start" ? VACUUM_FEATURE.START : VACUUM_FEATURE.CLEAN_AREA;
      for (const button of this._rooms.querySelectorAll("button.room")) {
        button.setAttribute(
          "aria-pressed",
          String(this._selected.has(button.dataset.areaId))
        );
        button.disabled = !ready || !!this._busy;
      }
      for (const tab of this._tabs.children) tab.disabled = !!this._busy;
      const rooms = this._metadata?.[this._index] || [];
      this._selectionToggle.disabled = !rooms.length || !ready || this._busy;
      this._selectionIcon.icon = this._selected.size ? "mdi:close" : "mdi:select-all";
      this._selectionLabel.textContent = this._selected.size ? "Clear selection" : "Select all";
      this._primaryAction = action;
      this._start.disabled = this._busy || !(features & feature) || action === "clean_area" && (!ready || !this._selected.size);
      this._startIcon.icon = action === "pause" ? "mdi:pause" : "mdi:play";
      let label = this._selected.size ? `Clean ${this._selected.size} ${this._selected.size === 1 ? "room" : "rooms"}` : "Clean rooms";
      if (state === "cleaning") label = "Pause cleaning";
      if (state === "paused") label = "Resume cleaning";
      if (state === "returning") label = "Returning to dock";
      this._startLabel.textContent = this._busy ? "Sending\u2026" : label;
      this._cleanAll.disabled = !ready || !(features & VACUUM_FEATURE.START) || this._busy;
      this._dock.disabled = !state || ["docked", "returning", "unknown", "unavailable"].includes(state) || !(features & VACUUM_FEATURE.RETURN_HOME) || this._busy;
    }
    async _perform(service) {
      if (this._busy || !["clean_area", "start", "pause", "return_to_base"].includes(service) || service === "clean_area" && !this._selected.size)
        return;
      const index = this._index;
      const vacuum = this._config.vacuums[this._index].entity;
      const ids = [...this._selected];
      const resuming = this._hass?.states?.[vacuum]?.state === "paused";
      this._busy = true;
      this._renderRooms();
      try {
        await this._hass.callService(
          "vacuum",
          service,
          service === "clean_area" ? { cleaning_area_id: ids } : {},
          { entity_id: vacuum }
        );
        if (service === "clean_area" && this._index === index)
          this._selected.clear();
        this._setFeedback(
          service === "clean_area" ? `Cleaning ${ids.length} ${ids.length === 1 ? "room" : "rooms"} requested.` : service === "return_to_base" ? "Return to dock requested." : service === "pause" ? "Pause requested." : resuming ? "Resume requested." : "Cleaning requested."
        );
      } catch (_) {
        this._setFeedback(
          service === "clean_area" ? "Could not start cleaning. Check the robot details." : "Could not control the vacuum. Try again.",
          true
        );
      } finally {
        this._busy = false;
        this._renderRooms();
      }
    }
    _setFeedback(message, error = false) {
      this._feedback.textContent = message;
      this._feedback.classList.toggle("error", error);
    }
  };

  // src/index.js
  if (!customElements.get("vacuum-areas-card")) {
    customElements.define("vacuum-areas-card", VacuumAreasCard);
  }
})();
