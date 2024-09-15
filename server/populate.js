import { initializeDB, insertSkill, insertTrait } from "./db.js";
import {
  fetchAllSpecializationIDs,
  fetchSpecialization,
  fetchAndStoreSkill,
  fetchAndStoreTrait,
} from "../api/gw2api.js";

async function populateDatabase() {
  await initializeDB();

  // Fetch all specialization IDs
  const specializationIDs = await fetchAllSpecializationIDs();

  // Fetch and store specialization data
  for (const id of specializationIDs) {
    const specialization = await fetchSpecialization(id);

    // Store skills
    for (const skillId of specialization.skills) {
      await fetchAndStoreSkill(skillId);
    }

    // Store traits
    for (const traitId of specialization.major_traits) {
      await fetchAndStoreTrait(traitId);
    }
    for (const traitId of specialization.minor_traits) {
      await fetchAndStoreTrait(traitId);
    }
  }

  console.log("Database populated successfully!");
}

populateDatabase().catch((error) => {
  console.error("Error populating database:", error);
});
