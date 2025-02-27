import { useQuery } from "@tanstack/react-query";
import { Ingredient, useGetIngredients } from "./useGetIngredients";

export type Recipe = {
  strYoutube: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  ingredients: Ingredient[];
  strTags: string;
  idMeal: string;
};

const EMPTY_RECIPE: Recipe = {
  strYoutube: "",
  strMeal: "",
  strMealThumb: "",
  strCategory: "",
  strArea: "",
  strTags: "",
  idMeal: "",
  ingredients: [],
};

const fetchRecipeById = async (id: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!response.ok) throw new Error("Помилка при отриманні рецепта");
  const data = await response.json();
  if (!data.meals) throw new Error("Рецепт не знайдено");
  return data.meals[0];
};

export const useGetRecipeById = (id: string) => {
  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id,
  });

  const ingredients = useGetIngredients(recipe);

  return {
    recipe: recipe
      ? {
          strYoutube: recipe.strYoutube,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          strCategory: recipe.strCategory,
          strArea: recipe.strArea,
          strTags: recipe.strTags,
          idMeal: recipe.idMeal,
          ingredients,
        }
      : EMPTY_RECIPE,
    loading: isLoading,
    error: isError ? error : null,
  };
};
