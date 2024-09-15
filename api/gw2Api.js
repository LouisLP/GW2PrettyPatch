const GW2_BASE_API_URL = "https://api.guildwars2.com/v2";

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
export async function fetchProfession(professionName) {
  const PROFESSION_URL = `${GW2_BASE_API_URL}/professions`;
  return fetchWithCache(`${PROFESSION_URL}/${professionName}`);
}

// Function to fetch all specialization IDs
export async function fetchAllSpecializationIDs() {
  const SPECIALIZATION_URL = `${GW2_BASE_API_URL}/specializations`;
  return fetchWithCache(SPECIALIZATION_URL);
}

// Function to fetch specialization data
export async function fetchSpecialization(id) {
  const SPECIALIZATION_URL = `${GW2_BASE_API_URL}/specializations`;
  return fetchWithCache(`${SPECIALIZATION_URL}/${id}`);
}

// Function to fetch elite specializations
export async function fetchEliteSpecializations() {
  const allSpecializationIDs = await fetchAllSpecializationIDs();
  const eliteSpecializations = [];

  for (const id of allSpecializationIDs) {
    const specialization = await fetchSpecialization(id);
    if (specialization.elite) {
      eliteSpecializations.push({
        id: specialization.id,
        name: specialization.name,
        profession: specialization.profession,
        icon: specialization.profession_icon,
        background: specialization.background,
      });
    }
  }

  return eliteSpecializations;
}

// Function to fetch all skill IDs
export async function fetchAllSkillIDs() {
  const SKILL_URL = `${GW2_BASE_API_URL}/skills`;
  return fetchWithCache(SKILL_URL);
}

// Function to fetch skill data
export async function fetchSkill(id) {
  const SKILL_URL = `${GW2_BASE_API_URL}/skills`;
  return fetchWithCache(`${SKILL_URL}/${id}`);
}

// Function to fetch all trait IDs
export async function fetchAllTraitIDs() {
  const TRAIT_URL = `${GW2_BASE_API_URL}/traits`;
  return fetchWithCache(TRAIT_URL);
}

// Function to fetch trait data
export async function fetchTrait(id) {
  const TRAIT_URL = `${GW2_BASE_API_URL}/traits`;
  return fetchWithCache(`${TRAIT_URL}/${id}`);
}
