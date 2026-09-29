# Changelog

## 0.1.6 — 29 September 2026

- Show a Retry button for failed room lookups or map images without retrying on every state update.
- Keep the other vacuum's rooms available when one mapping lookup fails, and discard unconfirmed room requests after 30 seconds.
- Let long floor tabs scroll on narrow screens and enlarge the Details and selection tap targets.
- Add a Stop action to cancel an active or paused clean without docking before choosing new rooms.
- Keep rooms chosen in the card highlighted during cleaning and pause.
- Keep only the full-view outer card square; let embedded cards and room buttons follow the Home Assistant theme.
- Restore the original pill style of the Clean, Dock, and selection buttons.

## 0.1.5 — 27 September 2026

- Align embedded card and map corners with their view context.

## 0.1.4 — 27 September 2026

- Restore edge-to-edge, square full-page panels while keeping theme-rounded ordinary cards and room controls.

## 0.1.3 — 27 September 2026

- Keep full-page cards inset with theme-rounded corners, and apply the theme's surface and radius tokens to room controls.

## 0.1.2 — 27 September 2026

- Show Clean all, Pause, or Resume on the main button according to the vacuum state, with a direct Dock control while the robot is away.
- Improve room spacing and use Home Assistant theme colors for rooms and controls.
- Keep the action buttons independent of Home Assistant's internal button component while retaining the theme-aligned appearance.

## 0.1.1 — 26 September 2026

- Add `full_view` for edge-to-edge dashboard panels.

## 0.1.0 — 26 September 2026

First public release. Choose mapped Home Assistant areas for one or more vacuums, view live map images, and send a single clean-area request for the selected rooms. The layout adapts to phones and wider screens; maps support zoom and pan. Battery status and a maintenance link are optional.
