import { useQuery } from "@tanstack/react-query";

const fetchRecipes = async (category?: string, area?: string) => {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  if (category) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  if (area) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data.meals || [];
};

export const useFetchRecipes = (category?: string, area?: string) => {
  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipes", category, area],
    queryFn: () => fetchRecipes(category, area),
  });

  return {
    recipes,
    loading: isLoading,
    error: isError ? error : null,
  };
};
