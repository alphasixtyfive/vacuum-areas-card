# Vacuum Areas Card

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=alphasixtyfive&repository=vacuum-areas-card&category=plugin)

A Home Assistant card for choosing mapped rooms and sending a vacuum to clean them. It puts the live map beside the room list on a wide screen and above it on a phone. The map supports pinch zoom and panning; room selection happens in the buttons below or beside it.

The card reads the vacuum's existing [area mapping](https://www.home-assistant.io/integrations/vacuum/#mapping-your-vacuum-areas-to-home-assistant-areas). Room names and icons come from Home Assistant areas. It does not need a second list of room IDs in the dashboard.

## Before you start

- Your vacuum must support Home Assistant's [`vacuum.clean_area`](https://www.home-assistant.io/actions/vacuum.clean_area/) action.
- Map the vacuum's segments to Home Assistant areas in the vacuum entity settings.
- Provide an `image` entity for each map you want to show. The card does not create or edit maps.

## Install

Use the HACS button above. If the repository is not listed yet, add `https://github.com/alphasixtyfive/vacuum-areas-card` in **HACS → Custom repositories**, choose **Dashboard**, and install it. Refresh Home Assistant after installation.

For a manual install, copy `vacuum-areas-card.js` to `/config/www/`. Add `/local/vacuum-areas-card.js` as a **JavaScript module** in **Settings → Dashboards → Resources**, then refresh the dashboard.

## Configure

Add the card to a dashboard in YAML mode:

```yaml
type: custom:vacuum-areas-card
vacuums:
  - name: Downstairs
    entity: vacuum.downstairs
    map: image.downstairs_map
    battery: sensor.downstairs_battery
  - name: Upstairs
    entity: vacuum.upstairs
    map: image.upstairs_map
    battery: sensor.upstairs_battery
```

`vacuums` accepts one or more entries. Each needs a vacuum `entity` and an image `map`. `name` replaces the tab label and `battery` adds a charge percentage; both are optional. A panel view gives the map the most room, but the card also adapts to narrower containers.

If you already have a sensor that counts vacuum upkeep items, you can add an optional link:

```yaml
maintenance:
  entity: sensor.vacuum_upkeep_items
  navigation_path: /dashboard-home/upkeep
```

The upkeep button appears only when that sensor has a positive numeric value. `navigation_path` must be a local Home Assistant path.

Select rooms, then press **Clean rooms**. The card sends one `vacuum.clean_area` request containing the selected Home Assistant area IDs. **Controls** opens the vacuum's native more-info dialog. Changing vacuums clears the current selection. The card does not start a cleaning run until you press the Clean button.

On touch screens, pinch to zoom the map and drag it while zoomed. Double tap resets it. With a keyboard, focus the map and use `+`, `-`, or `0`. Floor tabs support arrow, Home, and End keys.

## Development

The maintained source is in `src/`. Run `npm install` and `npm run build` to generate the root `vacuum-areas-card.js` that HACS downloads. There are no runtime dependencies. `npm test` checks the room/action behavior and that the generated file matches the source. Try layout changes in a Home Assistant dashboard at phone and tablet widths before publishing.

## License

MIT
