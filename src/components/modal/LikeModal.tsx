import React, { useEffect, useState } from "react";
import { useLikeRecipe } from "../../utils/useLikeRecipe";
import { useQuery } from "@tanstack/react-query";

interface LikeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LikeModal: React.FC<LikeModalProps> = ({ isOpen, onClose }) => {
  const { isLiked, toggleLike } = useLikeRecipe();
  const [likedRecipes, setLikedRecipes] = useState<any[]>([]);

  const { data: likedRecipeIds, isLoading } = useQuery({
    queryKey: ["likedRecipes"],
    queryFn: () => JSON.parse(localStorage.getItem("likedRecipes") || "[]"),
    enabled: isOpen,
  });

  useEffect(() => {
    if (likedRecipeIds) {
      const fetchLikedRecipes = async () => {
        const recipePromises = likedRecipeIds.map((idMeal: string) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then((response) => response.json())
            .then((data) => (data.meals ? data.meals[0] : null))
        );
        const recipes = await Promise.all(recipePromises);
        setLikedRecipes(recipes.filter(Boolean));
      };

      fetchLikedRecipes();
    }
  }, [likedRecipeIds]);

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black "
      onClick={(e) => handleOutsideClick(e)}
    >
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold">Liked Recipes</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4">
            {likedRecipes.length === 0 ? (
              <p>No liked recipes.</p>
            ) : (
              likedRecipes.map((recipe: any) => (
                <div key={recipe.idMeal} className="flex items-center space-x-4 mb-4">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3>{recipe.strMeal}</h3>
                    <p>{recipe.strCategory}</p>
                  </div>
                  <button
                    onClick={() => toggleLike(recipe.idMeal)}
                    className="ml-auto bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    {isLiked(recipe.idMeal) ? "Unlike" : "Like"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        <div className="mt-4">
          <button onClick={onClose} className="bg-white text-black  py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
