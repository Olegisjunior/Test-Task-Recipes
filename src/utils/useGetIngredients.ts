import { useMemo } from "react";

export type Ingredient = {
  ingredient: string;
  measure: string;
};

export const useGetIngredients = (recipe: Record<string, any> | null) => {
  return useMemo(() => {
    if (!recipe) return [];

    return Array.from({ length: 20 }, (_, i) => {
      const ingredient = recipe[`strIngredient${i + 1}`]?.trim();
      const measure = recipe[`strMeasure${i + 1}`]?.trim();
      return ingredient ? { ingredient, measure } : null;
    }).filter(Boolean) as Ingredient[];
  }, [recipe]);
};
