import { Link } from "react-router-dom";
import React from "react";
import { useLikeRecipe } from "../utils/useLikeRecipe";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

export const CartRecipe = React.memo((recipe: Recipe) => {
  const { toggleLike, isLiked } = useLikeRecipe();

  const handleLikeClick = () => {
    toggleLike(recipe.idMeal);
  };

  return (
    <>
      <div
        key={recipe.strMeal}
        className="shadow-md pb-4 pt-10 rounded-md w-[300px] h-[350px] bg-[#f5f5f5] flex flex-col justify-between items-center relative"
      >
        <Link
          to={`/Recipe/${recipe.idMeal}`}
          className="w-full h-[60%] flex justify-center items-center"
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-[100%] object-cover rounded-md"
          />
        </Link>

        <button
          className="absolute top-2 right-2 hover:cursor-pointer z-10"
          onClick={handleLikeClick}
        >
          <p className="hover:cursor-pointer hover:underline">
            {isLiked(recipe.idMeal) ? "Unlike" : "Like"}
          </p>
        </button>

        <Link to={`/Recipe/${recipe.idMeal}`} className="w-[90%]">
          <h3 className="text-lg font-semibold flex justify-center items-center text-center w-[100%] truncate">
            {recipe.strMeal}
          </h3>
        </Link>
        <p>
          <span>Category: </span>
          {recipe.strCategory}
        </p>
        <p>
          <span>Area: </span>
          {recipe.strArea}
        </p>
      </div>
    </>
  );
});
