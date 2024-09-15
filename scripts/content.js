const GW2_BASE_API_URL = "https://api.guildwars2.com/v2";
const PROFESSION_URL = `${GW2_BASE_API_URL}/professions`;
const SPECIALIZATION_URL = `${GW2_BASE_API_URL}/specializations`;
const TRAIT_URL = `${GW2_BASE_API_URL}/traits`;
const SKILL_URL = `${GW2_BASE_API_URL}/skills`;

const professions = [
  "Guardian",
  "Warrior",
  "Revenant",
  "Ranger",
  "Thief",
  "Engineer",
  "Elementalist",
  "Mesmer",
  "Necromancer",
];

// Cache for API responses
const apiCache = new Map();

// Helper function for API calls with caching
async function fetchWithCache(url) {
  if (apiCache.has(url)) {
    return apiCache.get(url);
  }
  const response = await fetch(url);
  const data = await response.json();
  apiCache.set(url, data);
  return data;
}

// Function to fetch profession data
async function fetchProfession(profession) {
  return fetchWithCache(`${PROFESSION_URL}/${profession}`);
}

// Function to fetch specialization data
async function fetchSpecialization(id) {
  return fetchWithCache(`${SPECIALIZATION_URL}/${id}`);
}

// Function to fetch trait data
async function fetchTrait(id) {
  return fetchWithCache(`${TRAIT_URL}/${id}`);
}

// Function to fetch skill data
async function fetchSkill(id) {
  return fetchWithCache(`${SKILL_URL}/${id}`);
}

// Function to identify professions in the text
function identifyProfessions(text) {
  const professionPattern = professions.join("|");
  const regex = new RegExp(`\\b(${professionPattern})\\b`, "g");
  return text.match(regex) || [];
}

// Function to identify specializations in the text
function identifySpecializations(text) {
  // This would need to be populated with actual specialization names
  const specializationNames = [
    "Dragonhunter",
    "Berserker",
    "Scrapper" /* ... */,
  ];
  const specializationPattern = specializationNames.join("|");
  const regex = new RegExp(`\\b(${specializationPattern})\\b`, "g");
  return text.match(regex) || [];
}

// Function to identify traits in the text
function identifyTraits(text) {
  // This is a simplified version. You might need more complex pattern matching
  const traitPattern = /["']([^"']+)["']/g;
  return (text.match(traitPattern) || []).map((match) =>
    match.replace(/["']/g, "")
  );
}

// Function to identify skills in the text
function identifySkills(text) {
  // Similar to traits, this might need more complex pattern matching
  const skillPattern = /["']([^"']+)["']/g;
  return (text.match(skillPattern) || []).map((match) =>
    match.replace(/["']/g, "")
  );
}

// Function to update the DOM with icons
function updateDOMWithIcons(
  professionIcons
  //   specializationIcons,
  //   traitIcons,
  //   skillIcons
) {
  const patchNotes = document.body;
  if (patchNotes) {
    let updatedHTML = patchNotes.innerHTML;

    // Update professions
    for (const [profession, iconUrl] of Object.entries(professionIcons)) {
      const regex = new RegExp(`\\b${profession}\\b`, "g");
      updatedHTML = updatedHTML.replace(
        regex,
        `<span class="profession-icon"><img src="${iconUrl}" alt="${profession} icon" style="width:25px;height:25px;vertical-align:middle;"> ${profession}</span>`
      );
    }

    // // Update specializations
    // for (const [specialization, iconUrl] of Object.entries(
    //   specializationIcons
    // )) {
    //   const regex = new RegExp(`\\b${specialization}\\b`, "g");
    //   updatedHTML = updatedHTML.replace(
    //     regex,
    //     `<span class="specialization-icon"><img src="${iconUrl}" alt="${specialization} icon" style="width:25px;height:25px;vertical-align:middle;"> ${specialization}</span>`
    //   );
    // }

    // // Update traits
    // for (const [trait, iconUrl] of Object.entries(traitIcons)) {
    //   const regex = new RegExp(`"${trait}"`, "g");
    //   updatedHTML = updatedHTML.replace(
    //     regex,
    //     `<span class="trait-icon"><img src="${iconUrl}" alt="${trait} icon" style="width:20px;height:20px;vertical-align:middle;"> "${trait}"</span>`
    //   );
    // }

    // // Update skills
    // for (const [skill, iconUrl] of Object.entries(skillIcons)) {
    //   const regex = new RegExp(`"${skill}"`, "g");
    //   updatedHTML = updatedHTML.replace(
    //     regex,
    //     `<span class="skill-icon"><img src="${iconUrl}" alt="${skill} icon" style="width:20px;height:20px;vertical-align:middle;"> "${skill}"</span>`
    //   );
    // }

    patchNotes.innerHTML = updatedHTML;
  }
}

// Main function to process patch notes
async function processPatchNotes() {
  const patchNotes = document.body.innerHTML;

  const identifiedProfessions = identifyProfessions(patchNotes);
  const identifiedSpecializations = identifySpecializations(patchNotes);
  const identifiedTraits = identifyTraits(patchNotes);
  const identifiedSkills = identifySkills(patchNotes);

  const professionIcons = {};
  const specializationIcons = {};
  const traitIcons = {};
  const skillIcons = {};

  // Fetch profession data
  for (const profession of identifiedProfessions) {
    const data = await fetchProfession(profession);
    professionIcons[profession] = data.icon;
  }

  //   // Fetch specialization data
  //   for (const specialization of identifiedSpecializations) {
  //     // You'd need to map specialization names to IDs
  //     const data = await fetchSpecialization(specializationId);
  //     specializationIcons[specialization] = data.icon;
  //   }

  //   // Fetch trait data
  //   for (const trait of identifiedTraits) {
  //     // You'd need to map trait names to IDs
  //     const data = await fetchTrait(traitId);
  //     traitIcons[trait] = data.icon;
  //   }

  //   // Fetch skill data
  //   for (const skill of identifiedSkills) {
  //     // You'd need to map skill names to IDs
  //     const data = await fetchSkill(skillId);
  //     skillIcons[skill] = data.icon;
  //   }

  updateDOMWithIcons(
    professionIcons
    // specializationIcons,
    // traitIcons,
    // skillIcons
  );
}

// Run the main function once the DOM is fully loaded
window.addEventListener("load", processPatchNotes);
