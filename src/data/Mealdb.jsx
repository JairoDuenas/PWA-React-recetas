const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function getLatest() {
  const res = await fetch(`${BASE_URL}/search.php?s=b`);
  const data = await res.json();
  return data.meals.map(normalizeMeal);
}

async function getRecipe(recipeId) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${recipeId}`);
  const data = await res.json();
  if (!data.meals) return null;
  return normalizeMeal(data.meals[0]);
}

function normalizeMeal(meal) {
  const m = {};
  m.id = meal.idMeal;
  m.name = meal.strMeal;
  m.category = meal.strCategory;
  m.origin = meal.strArea;
  m.instructions = meal.strInstructions
    .split("\n")
    .filter((l) => l.trim() !== "");
  m.thumbnail = meal.strMealThumb;
  m.tags = meal.strTags ? meal.strTags.split(",") : [];
  m.youtube = meal.strYoutube;
  m.url = meal.strSource;
  m.dateModified = meal.dateModified;
  m.ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const msr = meal[`strMeasure${i}`];
    if (ing && ing.trim() && msr && msr.trim()) {
      m.ingredients.push({ ingredient: ing, measure: msr });
    }
  }
  return m;
}

export const mealdb = { getLatest, getRecipe };
