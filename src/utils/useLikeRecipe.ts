import { useMutation } from "@tanstack/react-query";

const likeRecipe = async (idMeal: string) => {
  let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
  if (!likedRecipes.includes(idMeal)) {
    likedRecipes.push(idMeal);
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  }
  return likedRecipes;
};

const unlikeRecipe = async (idMeal: string) => {
  let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
  likedRecipes = likedRecipes.filter((id: string) => id !== idMeal);
  localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  return likedRecipes;
};

export const useLikeRecipe = () => {
  const { mutate: likeMutation } = useMutation({
    mutationFn: likeRecipe,
    onMutate: async (idMeal) => {
      let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
      if (!likedRecipes.includes(idMeal)) {
        likedRecipes.push(idMeal);
      }
      localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
    },
    onSuccess: (newLikedRecipes) => {
      console.log("Liked Recipes Updated:", newLikedRecipes);
    },
    onError: (error) => {
      console.error("Error liking recipe:", error);
    },
  });

  const { mutate: unlikeMutation } = useMutation({
    mutationFn: unlikeRecipe,
    onMutate: async (idMeal) => {
      let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
      likedRecipes = likedRecipes.filter((id: string) => id !== idMeal);
      localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
    },
    onSuccess: (newLikedRecipes) => {
      console.log("Liked Recipes Updated:", newLikedRecipes);
    },
    onError: (error) => {
      console.error("Error unliking recipe:", error);
    },
  });

  const toggleLike = (idMeal: string) => {
    const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
    if (likedRecipes.includes(idMeal)) {
      unlikeMutation(idMeal);
    } else {
      likeMutation(idMeal);
    }
  };

  const isLiked = (idMeal: string) => {
    return JSON.parse(localStorage.getItem("likedRecipes") || "[]").includes(idMeal);
  };

  return {
    toggleLike,
    isLiked,
  };
};
