import { fillProfessionData } from "../components/professions";
import { fillSpecializationData } from "../components/EliteSpecializations";
import { fillSkillAndTraitData } from "../components/skillsAndTraits";

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
