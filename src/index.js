import { VacuumAreasCard } from "./card.js";

if (!customElements.get("vacuum-areas-card")) {
  customElements.define("vacuum-areas-card", VacuumAreasCard);
}
