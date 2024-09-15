import { fillProfessionData } from "../components/professions.js";
import { fillSpecializationData } from "../components/EliteSpecializations.js";
import { fillSkillAndTraitData } from "../components/skillsAndTraits.js";

// Main function to process patch notes
async function processPatchNotes() {
  let patchNotes = document.body.innerHTML;
  patchNotes = await fillProfessionData(patchNotes);
  patchNotes = await fillSpecializationData(patchNotes);
  patchNotes = await fillSkillAndTraitData(patchNotes);
  document.body.innerHTML = patchNotes;
}

// Run the main function once the DOM is fully loaded
window.addEventListener("load", processPatchNotes);
