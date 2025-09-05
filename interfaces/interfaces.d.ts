type Country = {
  id: string;
  label: string;
  src: any; // require(...) image
};

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strSource: string | null;
  strYoutube: string | null;
  // strIngredient1..20 & strMeasure1..20 exist on the object
  [key: string]: any;
};

interface TrendingMeal {
  searchTerm: string;
  meal_id: number;
  title: string;
  count: number;
  poster_url: string;
}
