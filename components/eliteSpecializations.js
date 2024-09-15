import { fetchEliteSpecializations } from "../api/gw2api";
import { eliteSpecializationNames } from "../data/eliteSpecializations";
import $ from "jquery";

// Function to identify specializations in the text
export function identifySpecializations(text) {
  const specializationPattern = eliteSpecializationNames.join("|");
  const regex = new RegExp(`\\b(${specializationPattern})\\b`, "g");
  return text.match(regex) || [];
}

// Function to add specialization icons to the patch notes
export function addSpecializationIcons(patchNotes, specializationIcons) {
  const $patchNotes = $("<div>").html(patchNotes);

  // Update specializations
  for (const [specialization, iconUrl] of Object.entries(specializationIcons)) {
    const regex = new RegExp(`\\b${specialization}\\b`);
    $patchNotes.html(function (i, html) {
      return html.replace(
        regex,
        `<span class="specialization-icon"><img src="${iconUrl}" alt="${specialization} icon" style="width:25px;height:25px;vertical-align:middle;"> ${specialization}</span>`
      );
    });
  }

  return $patchNotes.html();
}

// Function to fetch and fill specialization data
export async function fillSpecializationData(patchNotes) {
  const identifiedSpecializations = identifySpecializations(patchNotes);

  const specializationIcons = {};

  // Fetch elite specialization data
  const eliteSpecializations = await fetchEliteSpecializations();

  // Map specialization names to icons
  for (const specialization of eliteSpecializations) {
    if (identifiedSpecializations.includes(specialization.name)) {
      specializationIcons[specialization.name] = specialization.icon;
    }
  }

  // Return the updated patch notes with specialization icons
  return addSpecializationIcons(patchNotes, specializationIcons);
}
