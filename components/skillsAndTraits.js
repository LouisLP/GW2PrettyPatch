import {
  fetchAllSkillIDs,
  fetchSkill,
  fetchAllTraitIDs,
  fetchTrait,
} from "../api/gw2api";
import $ from "jquery";

// Function to identify skills and traits in the text
export function identifySkillsAndTraits(text, names) {
  const pattern = names.join("|");
  const regex = new RegExp(`\\b(${pattern})\\b`, "g");
  return text.match(regex) || [];
}

// Function to add skill and trait icons to the patch notes
export function addIcons(patchNotes, icons) {
  const $patchNotes = $("<div>").html(patchNotes);

  // Update skills and traits
  for (const [name, iconUrl] of Object.entries(icons)) {
    const regex = new RegExp(`\\b${name}\\b`);
    $patchNotes.html(function (i, html) {
      return html.replace(
        regex,
        `<span class="icon"><img src="${iconUrl}" alt="${name} icon" style="width:25px;height:25px;vertical-align:middle;"> ${name}</span>`
      );
    });
  }

  return $patchNotes.html();
}

// Function to fetch and fill skill and trait data
export async function fillSkillAndTraitData(patchNotes) {
  const skillIDs = await fetchAllSkillIDs();
  const traitIDs = await fetchAllTraitIDs();

  const skills = await Promise.all(skillIDs.map((id) => fetchSkill(id)));
  const traits = await Promise.all(traitIDs.map((id) => fetchTrait(id)));

  const skillNames = skills.map((skill) => skill.name);
  const traitNames = traits.map((trait) => trait.name);

  const identifiedSkillsAndTraits = identifySkillsAndTraits(patchNotes, [
    ...skillNames,
    ...traitNames,
  ]);

  const icons = {};

  // Map skill names to icons
  for (const skill of skills) {
    if (identifiedSkillsAndTraits.includes(skill.name)) {
      icons[skill.name] = skill.icon;
    }
  }

  // Map trait names to icons
  for (const trait of traits) {
    if (identifiedSkillsAndTraits.includes(trait.name)) {
      icons[trait.name] = trait.icon;
    }
  }

  // Return the updated patch notes with skill and trait icons
  return addIcons(patchNotes, icons);
}
