const MEALDB_CONFIG = {
  BASE_URL: "https://www.themealdb.com/api/json/v1/1",
  API_KEY: "1",
};

// Search meal by name
// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

export const getMealByName = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${MEALDB_CONFIG.BASE_URL}/search.php?s=${query}`
    : `${MEALDB_CONFIG.BASE_URL}/categories.php`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Failed to Fetch Meals");
  }

  const data = await response.json();

  return data.meals;
};

// List all meals by first letter
// www.themealdb.com/api/json/v1/1/search.php?f=a

// Lookup full meal details by id
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Lookup a single random meal
// www.themealdb.com/api/json/v1/1/random.php

// List all meal categories
// www.themealdb.com/api/json/v1/1/categories.php

export const getMealCategories = async () => {
  const response = await fetch(`${MEALDB_CONFIG.BASE_URL}/categories.php`);

  if (!response.ok) {
    throw new Error("No categories available!");
  }

  const data = await response.json();

  return data.categories;
};

// List all Categories, Area, Ingredients
// www.themealdb.com/api/json/v1/1/list.php?c=list
// www.themealdb.com/api/json/v1/1/list.php?a=list
// www.themealdb.com/api/json/v1/1/list.php?i=list

// Filter by main ingredient
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

// Filter by Category
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

// Filter by Area
// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

// Meal Thumbnail Images
// Add /preview to the end of the meal image URL
// /images/media/meals/llcbn01574260722.jpg/small
// /images/media/meals/llcbn01574260722.jpg/medium
// /images/media/meals/llcbn01574260722.jpg/large
