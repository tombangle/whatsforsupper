const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

export interface MealResponse {
  meals: Meal[];
}

export const fetchRandomMeal = async (dietaryFilters: string[] = []): Promise<Meal> => {
  const maxRetries = 10;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await fetch(`${API_BASE_URL}/random.php`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MealResponse = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new Error('No meal data received');
      }
      
      const meal = data.meals[0];
      
      // Check if meal contains any filtered ingredients
      if (dietaryFilters.length > 0) {
        const mealContainsFilteredIngredient = checkMealAgainstFilters(meal, dietaryFilters);
        
        if (mealContainsFilteredIngredient) {
          attempts++;
          continue; // Try again with a new random meal
        }
      }
      
      return meal;
    } catch (error) {
      console.error('Error fetching random meal:', error);
      throw new Error('Failed to fetch meal. Please try again.');
    }
  }
  
  // If we've exhausted all retries, return a meal anyway with a warning
  console.warn('Could not find meal without filtered ingredients after maximum retries');
  const response = await fetch(`${API_BASE_URL}/random.php`);
  const data: MealResponse = await response.json();
  return data.meals[0];
};

const checkMealAgainstFilters = (meal: Meal, filters: string[]): boolean => {
  // Check meal title
  const mealTitle = meal.strMeal.toLowerCase();
  if (filters.some(filter => mealTitle.includes(filter))) {
    return true;
  }
  
  // Check category
  const category = meal.strCategory.toLowerCase();
  if (filters.some(filter => category.includes(filter))) {
    return true;
  }
  
  // Check ingredients (strIngredient1, strIngredient2, etc.)
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      const ingredientLower = ingredient.toLowerCase();
      if (filters.some(filter => ingredientLower.includes(filter))) {
        return true;
      }
    }
  }
  
  return false;
};

export const fetchMultipleRandomMeals = async (count: number, dietaryFilters: string[] = []): Promise<Meal[]> => {
  try {
    const promises = Array(count).fill(null).map(() => fetchRandomMeal(dietaryFilters));
    const meals = await Promise.all(promises);
    return meals;
  } catch (error) {
    console.error('Error fetching multiple meals:', error);
    throw new Error('Failed to fetch meals. Please try again.');
  }
};