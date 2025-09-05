import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const tables = new TablesDB(client);

export const updateSearchCount = async (query: string, meal: Meal) => {
  try {
    const result = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query)],
    });

    const existing = result.rows?.[0];
    if (existing) {
      await tables.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existing.$id,
        data: { count: Number((existing as any).count ?? 0) + 1 },
      });
    } else {
      await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          meal_id: Number(meal.idMeal),
          title: meal.strMeal,
          count: 1,
          poster_url: meal.strMealThumb,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMeals = async (): Promise<
  TrendingMeal[] | undefined
> => {
  try {
    const res = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    const items = (res as any).rows ?? (res as any).documents ?? [];
    return items as TrendingMeal[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
