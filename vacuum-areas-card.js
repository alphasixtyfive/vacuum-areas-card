(() => {
  "use strict";

  class VacuumAreasCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._index = 0;
      this._selected = new Set();
      this._metadata = null;
      this._roomsError = false;
      this._roomKey = null;
      this._request = 0;
      this._loading = false;
      this._busy = false;
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; min-width: 0; width: calc(100% - 32px); margin: 16px auto; container-type: inline-size; }
          [hidden] { display: none !important; }
          ha-card { display: flex; flex-direction: column; box-sizing: border-box; height: calc(100dvh - 88px); overflow: hidden; border: 1px solid var(--divider-color); border-radius: 18px; }
          button { font: inherit; cursor: pointer; }
          button:disabled { cursor: default; opacity: .48; }
          button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
          .tabs { display: flex; gap: 4px; padding: 8px 16px 0; border-bottom: 1px solid var(--divider-color); }
          .tab { min-height: 44px; padding: 0 16px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--secondary-text-color); font-weight: 500; }
          .tab[aria-selected="true"] { color: var(--primary-text-color); border-bottom-color: var(--primary-color); }
          .body { display: grid; grid-template-columns: minmax(0, 1fr) clamp(340px, 38%, 440px); flex: 1; min-height: 0; gap: 0; }
          .map { display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; height: 100%; min-width: 0; padding: 12px; overflow: hidden; background: var(--card-background-color); }
          .map-viewer { --base-scale: 1; position: relative; width: 100%; height: 100%; border-radius: 12px; overflow: hidden; background: var(--primary-background-color); touch-action: pan-y; }
          .map-viewer:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
          .map-viewer.zoomed { touch-action: none; cursor: grab; }
          .map-viewer.zoomed:active { cursor: grabbing; }
          .map img { display: block; width: 100%; height: 100%; object-fit: contain; user-select: none; -webkit-user-drag: none; }
          .map-empty { position: absolute; inset: 0; display: grid; place-items: center; color: var(--secondary-text-color); }
          .panel { min-width: 0; padding: 24px; border-left: 1px solid var(--divider-color); display: flex; flex-direction: column; }
          .status { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
          .status ha-icon { color: var(--primary-color); --mdc-icon-size: 24px; width: 42px; height: 42px; flex: 0 0 42px; display: grid; place-items: center; border-radius: 50%; background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color)); }
          .status-copy { min-width: 0; flex: 1; }
          .status strong { display: block; font-size: 18px; line-height: 24px; }
          .status span { color: var(--secondary-text-color); line-height: 22px; }
          .maintenance { min-width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 3px; border: 1px solid var(--warning-color, #ff9800); border-radius: 12px; background: color-mix(in srgb, var(--warning-color, #ff9800) 12%, var(--card-background-color)); color: var(--warning-color, #ff9800); }
          .maintenance ha-icon { width: auto; height: auto; flex: none; border-radius: 0; background: transparent; color: inherit; --mdc-icon-size: 20px; }
          .maintenance span { color: inherit; font-size: 13px; font-weight: 600; }
          .rooms-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
          .rooms-head strong { font-size: 16px; }
          .selection-toggle { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; border: 1px solid var(--divider-color); border-radius: 12px; background: transparent; color: var(--primary-text-color); padding: 0 10px; font-size: 13px; white-space: nowrap; }
          .selection-toggle ha-icon { --mdc-icon-size: 17px; }
          .selection-toggle:hover:not(:disabled), .details:hover { background: color-mix(in srgb, var(--primary-text-color) 5%, var(--card-background-color)); }
          .rooms { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
          .room { position: relative; min-width: 0; height: 112px; box-sizing: border-box; border: 1px solid var(--divider-color); border-radius: 14px; padding: 12px; background: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color)); color: var(--primary-text-color); text-align: left; display: flex; flex-direction: column; justify-content: space-between; gap: 4px; }
          .room:hover { background: color-mix(in srgb, var(--primary-text-color) 5%, var(--card-background-color)); }
          .room[aria-pressed="true"] { border-color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 15%, var(--card-background-color)); }
          .room-icon { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--secondary-background-color); color: var(--secondary-text-color); }
          .room-icon ha-icon { --mdc-icon-size: 20px; }
          .room[aria-pressed="true"] .room-icon { background: color-mix(in srgb, var(--primary-color) 20%, var(--card-background-color)); color: var(--primary-color); }
          .room-name { font-size: 13px; font-weight: 500; line-height: 17px; overflow-wrap: anywhere; }
          .room-check { position: absolute; top: 12px; right: 12px; color: var(--primary-color); --mdc-icon-size: 18px; }
          .room[aria-pressed="false"] .room-check { display: none; }
          .hint { color: var(--secondary-text-color); line-height: 22px; }
          .actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: auto; padding-top: 20px; }
          .actions button { display: flex; align-items: center; justify-content: center; gap: 8px; min-width: 0; min-height: 48px; border-radius: 12px; padding: 0 8px; white-space: nowrap; }
          .actions ha-icon { --mdc-icon-size: 18px; }
          .details { border: 1px solid var(--divider-color); color: var(--primary-text-color); background: transparent; }
          .start { border: 0; background: var(--primary-color); color: var(--text-primary-color, white); font-weight: 600; }
          .feedback { min-height: 22px; margin-top: 8px; color: var(--secondary-text-color); font-size: 13px; }
          .feedback:empty { display: none; }
          .feedback.error { color: var(--error-color); }
          @container (max-width: 720px) {
            ha-card { height: auto; }
            .body { display: flex; flex: none; flex-direction: column; min-height: auto; }
            .map { height: clamp(280px, 40dvh, 360px); }
            .map-viewer { --base-scale: 1.2; }
            .panel { border-left: 0; border-top: 1px solid var(--divider-color); padding: 16px; }
            .status { margin-bottom: 16px; }
            .rooms-head { margin-bottom: 8px; }
            .rooms { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .room { height: 64px; padding: 8px 10px; flex-direction: row; align-items: center; justify-content: flex-start; gap: 8px; }
            .room-icon { width: 28px; height: 28px; flex: 0 0 28px; }
            .room-icon ha-icon { --mdc-icon-size: 18px; }
            .room-name { line-height: 16px; }
            .room-check { top: 5px; left: 29px; right: auto; --mdc-icon-size: 14px; }
            .actions { padding-top: 16px; }
          }
          @container (max-width: 340px) { .rooms { grid-template-columns: 1fr; } }
          @media (max-height: 700px) {
            @container (min-width: 721px) {
              .panel { padding: 16px; }
              .status { margin-bottom: 12px; }
              .rooms-head { margin-bottom: 8px; }
              .room { height: 80px; padding: 8px; }
              .room-icon { width: 28px; height: 28px; }
              .room-icon ha-icon { --mdc-icon-size: 18px; }
              .room-name { font-size: 12px; line-height: 16px; }
              .actions { padding-top: 12px; }
            }
          }
          @container (min-width: 721px) { .map-viewer { --base-scale: 1.1; } }
          @container (min-width: 1700px) { .map-viewer { --base-scale: 1.3; } }
        </style>
        <ha-card>
          <div class="tabs" role="tablist" aria-label="Vacuums"></div>
          <div class="body" id="vacuum-panel" role="tabpanel">
            <div class="map"><div class="map-viewer" role="group" aria-label="Vacuum map. Pinch to zoom." tabindex="0"><img alt="" hidden><span class="map-empty">Map unavailable</span></div></div>
            <div class="panel">
              <div class="status"><ha-icon icon="mdi:robot-vacuum"></ha-icon><div class="status-copy"><strong></strong><span></span></div><button class="maintenance" type="button" hidden><ha-icon icon="mdi:robot-vacuum-alert" aria-hidden="true"></ha-icon><span></span></button></div>
              <div class="rooms-head"><strong>Rooms</strong><button class="selection-toggle" type="button"><ha-icon icon="mdi:select-all" aria-hidden="true"></ha-icon><span>Select all</span></button></div>
              <div class="rooms"></div>
              <div class="actions"><button class="details" type="button"><ha-icon icon="mdi:tune-variant" aria-hidden="true"></ha-icon><span>Controls</span></button><button class="start" type="button"><ha-icon icon="mdi:play" aria-hidden="true"></ha-icon><span>Clean rooms</span></button></div>
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
      this._pointers = new Map();
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
      this._startLabel = this._start.querySelector("span");
      this._feedback = this.shadowRoot.querySelector(".feedback");
      this._maintenance.addEventListener("click", () => {
        const path = this._config.maintenance?.navigation_path;
        if (!path || window.location.pathname === path) return;
        const from = window.location.pathname + window.location.search + window.location.hash;
        window.history.pushState({ from }, "", path);
        window.dispatchEvent(new CustomEvent("location-changed", { bubbles: true, composed: true, detail: { replace: false } }));
      });
      this._mapViewer.addEventListener("pointerdown", (event) => this._pointerDown(event));
      this._mapViewer.addEventListener("pointermove", (event) => this._pointerMove(event));
      this._mapViewer.addEventListener("pointerup", (event) => this._pointerUp(event));
      this._mapViewer.addEventListener("pointercancel", (event) => this._pointerUp(event));
      this._mapViewer.addEventListener("dblclick", () => this._resetMap());
      this._mapViewer.addEventListener("wheel", (event) => {
        if (!event.ctrlKey || !this._map.getAttribute("src")) return;
        event.preventDefault();
        this._zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY / 300));
      }, { passive: false });
      this._mapViewer.addEventListener("keydown", (event) => {
        if (event.key === "0") this._resetMap();
        else if (event.key === "+" || event.key === "=") this._zoomAt(null, null, 1.35);
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
      this._start.addEventListener("click", () => this._clean());
      this.shadowRoot.querySelector(".details").addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          bubbles: true, composed: true, detail: { entityId: this._config.vacuums[this._index].entity }
        }));
      });
    }

    setConfig(config) {
      const validVacuum = (item) => item
        && typeof item.entity === "string" && item.entity.startsWith("vacuum.")
        && typeof item.map === "string" && item.map.startsWith("image.")
        && (item.battery === undefined || typeof item.battery === "string")
        && (item.name === undefined || typeof item.name === "string");
      if (!Array.isArray(config?.vacuums) || !config.vacuums.length || !config.vacuums.every(validVacuum)) {
        throw new Error("vacuum-areas-card needs vacuums with entity and map.");
      }
      if (config.maintenance && (typeof config.maintenance.entity !== "string" || typeof config.maintenance.navigation_path !== "string" || !/^\/(?!\/)/.test(config.maintenance.navigation_path))) {
        throw new Error("maintenance needs an entity and local navigation_path.");
      }
      this._config = config;
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
          const next = event.key === "ArrowRight" ? (index + 1) % count
            : event.key === "ArrowLeft" ? (index - 1 + count) % count
              : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : null;
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

    connectedCallback() { window.addEventListener("resize", this._onResize); this._applyMapTransform(); }
    disconnectedCallback() { window.removeEventListener("resize", this._onResize); }

    getCardSize() { return 8; }
    getGridOptions() { return { columns: "full" }; }

    _selectVacuum(index) {
      if (this._busy || index === this._index) return;
      this._index = index;
      this._selected.clear();
      this._resetMap();
      this._setFeedback("");
      this._render();
    }

    async _loadRooms() {
      if (!this._config || !this._hass?.callWS || this._metadata || this._loading) return;
      const request = ++this._request;
      this._loading = true;
      try {
        const [areas, ...entries] = await Promise.all([
          this._hass.callWS({ type: "config/area_registry/list" }),
          ...this._config.vacuums.map((item) => this._hass.callWS({ type: "config/entity_registry/get", entity_id: item.entity }))
        ]);
        if (request !== this._request) return;
        const names = new Map(areas.map((area) => [area.area_id, { name: area.name, icon: area.icon || "mdi:home-outline" }]));
        this._metadata = entries.map((entry) => Object.keys(entry.options?.vacuum?.area_mapping || {})
          .filter((id) => names.has(id))
          .map((id) => ({ id, ...names.get(id) }))
          .sort((a, b) => a.name.localeCompare(b.name)));
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
      const detail = state?.state && !["unknown", "unavailable"].includes(state.state)
        ? state.state.replaceAll("_", " ").replace(/^./, (char) => char.toUpperCase()) : "Unavailable";
      this._statusName.textContent = detail;
      this._statusDetail.textContent = /^\d+(\.\d+)?$/.test(battery || "")
        ? `${Math.round(Number(battery))}% battery` : item.battery ? "Battery unavailable" : "";
      const upkeep = this._config.maintenance;
      const upkeepCount = Number(this._hass?.states?.[upkeep?.entity]?.state);
      this._maintenance.hidden = !upkeep || !Number.isFinite(upkeepCount) || upkeepCount <= 0;
      if (!this._maintenance.hidden) {
        this._maintenanceCount.textContent = String(upkeepCount);
        this._maintenance.setAttribute("aria-label", `${upkeepCount} vacuum upkeep ${upkeepCount === 1 ? "item" : "items"}`);
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
      this._mapViewer.setAttribute("aria-label", `${this._label(item)} map. Pinch to zoom; double tap to reset.`);
      this._renderRooms();
    }

    _point(x, y) {
      const rect = this._mapViewer.getBoundingClientRect();
      return { x: x - rect.left - rect.width / 2, y: y - rect.top - rect.height / 2 };
    }

    _startPinch() {
      const [a, b] = [...this._pointers.values()];
      const first = this._point(a.x, a.y);
      const second = this._point(b.x, b.y);
      this._pinch = {
        distance: Math.hypot(first.x - second.x, first.y - second.y),
        zoom: this._zoom, pan: { ...this._pan },
        center: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
      };
    }

    _pointerDown(event) {
      if (!this._map.getAttribute("src") || (event.pointerType === "mouse" && event.button !== 0)) return;
      this._mapViewer.setPointerCapture(event.pointerId);
      this._pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this._pointers.size === 2) this._startPinch();
      else this._drag = { x: event.clientX, y: event.clientY, pan: { ...this._pan } };
    }

    _pointerMove(event) {
      if (!this._pointers.has(event.pointerId)) return;
      this._pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this._pointers.size === 2 && this._pinch?.distance) {
        const [a, b] = [...this._pointers.values()];
        const first = this._point(a.x, a.y);
        const second = this._point(b.x, b.y);
        const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
        this._zoom = Math.max(1, Math.min(3, this._pinch.zoom * Math.hypot(first.x - second.x, first.y - second.y) / this._pinch.distance));
        const ratio = this._zoom / this._pinch.zoom;
        this._pan = {
          x: center.x + (this._pinch.pan.x - this._pinch.center.x) * ratio,
          y: center.y + (this._pinch.pan.y - this._pinch.center.y) * ratio
        };
        this._applyMapTransform();
      } else if (this._pointers.size === 1 && this._zoom > 1) {
        this._pan = { x: this._drag.pan.x + event.clientX - this._drag.x, y: this._drag.pan.y + event.clientY - this._drag.y };
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
      this._pan = { x: point.x + (this._pan.x - point.x) * ratio, y: point.y + (this._pan.y - point.y) * ratio };
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
      const base = Number.parseFloat(getComputedStyle(this._mapViewer).getPropertyValue("--base-scale")) || 1;
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
          hint.textContent = this._roomsError ? "Rooms unavailable" : this._metadata ? "No mapped rooms" : "Loading rooms…";
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
      for (const button of this._rooms.querySelectorAll("button.room")) {
        button.setAttribute("aria-pressed", String(this._selected.has(button.dataset.areaId)));
        button.disabled = !!this._busy;
      }
      for (const tab of this._tabs.children) tab.disabled = !!this._busy;
      const rooms = this._metadata?.[this._index] || [];
      const state = this._hass?.states?.[this._config.vacuums[this._index].entity]?.state;
      this._selectionToggle.disabled = !rooms.length || this._busy;
      this._selectionIcon.icon = this._selected.size ? "mdi:close" : "mdi:select-all";
      this._selectionLabel.textContent = this._selected.size ? "Clear selection" : "Select all";
      this._start.disabled = !this._selected.size || !state || ["unknown", "unavailable"].includes(state) || this._busy;
      this._startLabel.textContent = this._busy ? "Starting…" : this._selected.size ? `Clean ${this._selected.size} ${this._selected.size === 1 ? "room" : "rooms"}` : "Clean rooms";
    }

    async _clean() {
      if (this._busy || !this._selected.size) return;
      const index = this._index;
      const vacuum = this._config.vacuums[this._index].entity;
      const ids = [...this._selected];
      this._busy = true;
      this._renderRooms();
      try {
        await this._hass.callService("vacuum", "clean_area", { cleaning_area_id: ids }, { entity_id: vacuum });
        if (this._index === index) this._selected.clear();
        this._setFeedback(`Cleaning ${ids.length} ${ids.length === 1 ? "room" : "rooms"} requested.`);
      } catch (_) {
        this._setFeedback("Could not start cleaning. Check the robot controls.", true);
      } finally {
        this._busy = false;
        this._renderRooms();
      }
    }

    _setFeedback(message, error = false) {
      this._feedback.textContent = message;
      this._feedback.classList.toggle("error", error);
    }
  }

  if (!customElements.get("vacuum-areas-card")) customElements.define("vacuum-areas-card", VacuumAreasCard);
})();
