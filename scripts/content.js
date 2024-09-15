import { fillProfessionData } from "../components/professions";

// Main function to process patch notes
async function processPatchNotes() {
  const patchNotes = document.body.innerHTML;
  const updatedPatchNotes = await fillProfessionData(patchNotes);
  document.body.innerHTML = updatedPatchNotes;
}

// Run the main function once the DOM is fully loaded
window.addEventListener("load", processPatchNotes);
