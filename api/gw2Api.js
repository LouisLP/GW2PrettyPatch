const GW2_BASE_API_URL = "https://api.guildwars2.com/v2";
const SERVER_API_URL = "http://localhost:3000/api";

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
  const url = `${GW2_BASE_API_URL}/professions/${professionName}`;
  return fetchWithCache(url);
}

// Function to fetch all specialization IDs
export async function fetchAllSpecializationIDs() {
  const url = `${GW2_BASE_API_URL}/specializations`;
  return fetchWithCache(url);
}

// Function to fetch specialization data
export async function fetchSpecialization(id) {
  const url = `${GW2_BASE_API_URL}/specializations/${id}`;
  return fetchWithCache(url);
}

// Function to fetch elite specializations
export async function fetchEliteSpecializations() {
  const url = `${GW2_BASE_API_URL}/specializations?ids=all`;
  return fetchWithCache(url);
}

// Function to fetch skill data and store it in the database
export async function fetchAndStoreSkill(id) {
  const url = `${GW2_BASE_API_URL}/skills/${id}`;
  const skill = await fetchWithCache(url);

  // Check if the skill already exists in the database
  const existingSkill = await getSkillByName(skill.name);
  if (!existingSkill) {
    await fetch(`${SERVER_API_URL}/skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skill),
    });
  }
}

// Function to fetch trait data and store it in the database
export async function fetchAndStoreTrait(id) {
  const url = `${GW2_BASE_API_URL}/traits/${id}`;
  const trait = await fetchWithCache(url);

  // Check if the trait already exists in the database
  const existingTrait = await getTraitByName(trait.name);
  if (!existingTrait) {
    await fetch(`${SERVER_API_URL}/trait`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trait),
    });
  }
}

// Function to get skill data by name
export async function getSkill(name) {
  const url = `${SERVER_API_URL}/skill/${name}`;
  const response = await fetch(url);
  return response.json();
}

// Function to get trait data by name
export async function getTrait(name) {
  const url = `${SERVER_API_URL}/trait/${name}`;
  const response = await fetch(url);
  return response.json();
}
