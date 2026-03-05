import { useEffect, useState } from "react";
import { mealdb } from "../data/Mealdb";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    mealdb
      .getLatest()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { recipes, loading, error };
}

export function useRecipe(recipeId) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!recipeId) return;
    setLoading(true);
    mealdb
      .getRecipe(recipeId)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [recipeId]);

  return { recipe, loading, error };
}
