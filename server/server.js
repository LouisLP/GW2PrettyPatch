import express from "express";
import {
  initializeDB,
  insertSkill,
  insertTrait,
  getSkillByName,
  getTraitByName,
} from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/skill", async (req, res) => {
  const skill = req.body;
  await insertSkill(skill);
  res.status(201).send("Skill inserted");
});

app.post("/api/trait", async (req, res) => {
  const trait = req.body;
  await insertTrait(trait);
  res.status(201).send("Trait inserted");
});

app.get("/api/skill/:name", async (req, res) => {
  const name = req.params.name;
  const skill = await getSkillByName(name);
  res.json(skill);
});

app.get("/api/trait/:name", async (req, res) => {
  const name = req.params.name;
  const trait = await getTraitByName(name);
  res.json(trait);
});

initializeDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
