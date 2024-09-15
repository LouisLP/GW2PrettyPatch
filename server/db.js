import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./gw2data.db",
  driver: sqlite3.Database,
});

export async function initializeDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE,
      icon TEXT
    );
    CREATE TABLE IF NOT EXISTS traits (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE,
      icon TEXT
    );
  `);
}

export async function insertSkill(skill) {
  const db = await dbPromise;
  await db.run(
    "INSERT OR IGNORE INTO skills (id, name, icon) VALUES (?, ?, ?)",
    skill.id,
    skill.name,
    skill.icon
  );
}

export async function insertTrait(trait) {
  const db = await dbPromise;
  await db.run(
    "INSERT OR IGNORE INTO traits (id, name, icon) VALUES (?, ?, ?)",
    trait.id,
    trait.name,
    trait.icon
  );
}

export async function getSkillByName(name) {
  const db = await dbPromise;
  return db.get("SELECT * FROM skills WHERE name = ?", name);
}

export async function getTraitByName(name) {
  const db = await dbPromise;
  return db.get("SELECT * FROM traits WHERE name = ?", name);
}
