import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

interface LikeState {
  likedRecipes: Recipe[];
}

const initialState: LikeState = {
  likedRecipes: Array.isArray(JSON.parse(localStorage.getItem("likedRecipes") || "[]"))
    ? JSON.parse(localStorage.getItem("likedRecipes") || "[]")
    : [],
};

const likeSlice = createSlice({
  name: "likedRecipes",
  initialState,
  reducers: {
    addLikedRecipe(state, action: PayloadAction<Recipe>) {
      if (Array.isArray(state.likedRecipes)) {
        state.likedRecipes.push(action.payload);
        localStorage.setItem("likedRecipes", JSON.stringify(state.likedRecipes));
      }
    },
    removeLikedRecipe(state, action: PayloadAction<string>) {
      if (Array.isArray(state.likedRecipes)) {
        state.likedRecipes = state.likedRecipes.filter(
          (recipe) => recipe.idMeal !== action.payload
        );
        localStorage.setItem("likedRecipes", JSON.stringify(state.likedRecipes));
      }
    },
  },
});

export const { addLikedRecipe, removeLikedRecipe } = likeSlice.actions;
export default likeSlice.reducer;
