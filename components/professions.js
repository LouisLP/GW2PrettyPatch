import { fetchProfession } from "../api/gw2api.js";
import { professionNames } from "../data/professions.js";
import $ from "jquery";

// Function to identify professions in the text
export function identifyProfessions(text) {
  const professionPattern = professionNames.join("|");
  const regex = new RegExp(`\\b(${professionPattern})\\b`, "g");
  return text.match(regex) || [];
}

// Function to add profession icons to the patch notes
export function addProfessionIcons(patchNotes, professionIcons) {
  const $patchNotes = $("<div>").html(patchNotes);

  // Update professions
  for (const [profession, iconUrl] of Object.entries(professionIcons)) {
    const regex = new RegExp(`\\b${profession}\\b`);
    $patchNotes.html(function (i, html) {
      return html.replace(
        regex,
        `<span class="profession-icon"><img src="${iconUrl}" alt="${profession} icon" style="width:25px;height:25px;vertical-align:middle;"> ${profession}</span>`
      );
    });
  }

  return $patchNotes.html();
}

// Function to fetch and fill profession data
export async function fillProfessionData(patchNotes) {
  const identifiedProfessions = identifyProfessions(patchNotes);

  const professionIcons = {};

  // Fetch profession data
  for (const profession of identifiedProfessions) {
    if (!professionIcons[profession]) {
      const data = await fetchProfession(profession);
      professionIcons[profession] = data.icon;
    }
  }

  // Return the updated patch notes with profession icons
  return addProfessionIcons(patchNotes, professionIcons);
}
