// services/saved.repo.ts
import { all, first, run } from "./db/sqlite";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strSource: string | null;
  strYoutube: string | null;
  [key: string]: any;
};

/** read all saved meals (newest first) */
export async function getSavedMeals(): Promise<Meal[]> {
  return all<Meal>(`
    SELECT idMeal, strMeal, strMealThumb, strCategory, strArea,
           strInstructions, strSource, strYoutube
    FROM saved_meals
    ORDER BY created_at DESC;
  `);
}

/** check if a meal is saved */
export async function isSaved(idMeal: string): Promise<boolean> {
  const row = await first<{ idMeal: string }>(
    `SELECT idMeal FROM saved_meals WHERE idMeal = ? LIMIT 1;`,
    [idMeal]
  );
  return !!row;
}

/** save (idempotent) */
export async function saveMeal(m: Meal) {
  await run(
    `INSERT OR REPLACE INTO saved_meals (
       idMeal, strMeal, strMealThumb, strCategory, strArea,
       strInstructions, strSource, strYoutube, created_at
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(
       (SELECT created_at FROM saved_meals WHERE idMeal = ?),
       strftime('%s','now')*1000
     ));`,
    [
      m.idMeal,
      m.strMeal,
      m.strMealThumb ?? null,
      m.strCategory ?? null,
      m.strArea ?? null,
      m.strInstructions ?? null,
      m.strSource ?? null,
      m.strYoutube ?? null,
      m.idMeal,
    ]
  );
}

/** unsave */
export async function unsaveMeal(idMeal: string) {
  await run(`DELETE FROM saved_meals WHERE idMeal = ?;`, [idMeal]);
}

/** toggle */
export async function toggleSaved(m: Meal) {
  if (await isSaved(m.idMeal)) return unsaveMeal(m.idMeal);
  return saveMeal(m);
}
