import { getSkill, getTrait } from "../api/gw2api.js";
import $ from "jquery";

// Function to extract names from <ul> elements
export function extractNamesFromPatchNotes(patchNotes) {
  const $patchNotes = $("<div>").html(patchNotes);
  const names = [];

  $patchNotes.find("ul[type='disc'] li span").each(function () {
    const text = $(this).text();
    const name = text.split(":")[0].trim();
    if (name) {
      names.push(name);
    }
  });

  return names;
}

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
  const names = extractNamesFromPatchNotes(patchNotes);

  const skills = await Promise.all(
    names.map((name) => getSkill(name).catch(() => null))
  );
  const traits = await Promise.all(
    names.map((name) => getTrait(name).catch(() => null))
  );

  const skillNames = skills.filter((skill) => skill).map((skill) => skill.name);
  const traitNames = traits.filter((trait) => trait).map((trait) => trait.name);

  const identifiedSkillsAndTraits = identifySkillsAndTraits(patchNotes, [
    ...skillNames,
    ...traitNames,
  ]);

  const icons = {};

  // Map skill names to icons
  for (const skill of skills) {
    if (skill && identifiedSkillsAndTraits.includes(skill.name)) {
      icons[skill.name] = skill.icon;
    }
  }

  // Map trait names to icons
  for (const trait of traits) {
    if (trait && identifiedSkillsAndTraits.includes(trait.name)) {
      icons[trait.name] = trait.icon;
    }
  }

  // Return the updated patch notes with skill and trait icons
  return addIcons(patchNotes, icons);
}
