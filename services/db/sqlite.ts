// services/db/sqlite.ts
import * as SQLite from "expo-sqlite";

/** One DB for the whole app (sync open, async ops) */
export const db = SQLite.openDatabaseSync("meals.db");

/** Create table once (call at app start) */
export async function ensureDb() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS saved_meals (
      idMeal TEXT PRIMARY KEY NOT NULL,
      strMeal TEXT NOT NULL,
      strMealThumb TEXT,
      strCategory TEXT,
      strArea TEXT,
      strInstructions TEXT,
      strSource TEXT,
      strYoutube TEXT,
      created_at INTEGER NOT NULL
    );
  `);
}

/** Run a statement that doesn't return rows */
export async function run(sql: string, params: any[] = []): Promise<void> {
  await db.runAsync(sql, params);
}

/** Return all rows as a typed array */
export async function all<T>(sql: string, params: any[] = []): Promise<T[]> {
  return db.getAllAsync<T>(sql, params);
}

/** Return first row (or undefined) */
export async function first<T>(
  sql: string,
  params: any[] = []
): Promise<T | undefined> {
  const result = await db.getFirstAsync<T>(sql, params);
  return result === null ? undefined : result;
}
