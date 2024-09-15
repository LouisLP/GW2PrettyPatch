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
export async function fetchProfession(profession) {
  const PROFESSION_URL = `${GW2_BASE_API_URL}/professions`;
  return fetchWithCache(`${PROFESSION_URL}/${profession}`);
}

// Function to fetch specialization data
export async function fetchSpecialization(id) {
  const SPECIALIZATION_URL = `${GW2_BASE_API_URL}/specializations`;
  return fetchWithCache(`${SPECIALIZATION_URL}/${id}`);
}

// Function to fetch trait data
export async function fetchTrait(id) {
  const TRAIT_URL = `${GW2_BASE_API_URL}/traits`;
  return fetchWithCache(`${TRAIT_URL}/${id}`);
}

// Function to fetch skill data
export async function fetchSkill(id) {
  const SKILL_URL = `${GW2_BASE_API_URL}/skills`;
  return fetchWithCache(`${SKILL_URL}/${id}`);
}
