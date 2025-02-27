import { useQuery } from "@tanstack/react-query";

const fetchRecipesByLetter = async (letter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals || [];
};

export const useFetchRecipes = () => {
  const letters = ["a", "b", "c", "d", "e"];
  const queries = letters.map((letter) =>
    useQuery({ queryKey: [`recipes-${letter}`], queryFn: () => fetchRecipesByLetter(letter) })
  );

  const recipes = Array.from(
    new Set(queries.flatMap((query) => query.data || []).map((recipe) => recipe.idMeal)) // Створюємо Set по idMeal
  ).map(
    (idMeal) =>
      queries.flatMap((query) => query.data || []).find((recipe) => recipe.idMeal === idMeal) // Знаходимо рецепт по idMeal
  );

  const loading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.isError)?.error;

  return {
    recipes,
    loading,
    error,
  };
};
