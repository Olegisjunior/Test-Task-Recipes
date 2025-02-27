import { useParams } from "react-router-dom";
import { useGetRecipeById } from "../utils/useGetRecipeById";

export function Recipe() {
  const { id } = useParams();

  if (!id) {
    return <p>Invalid Id</p>;
  }
  const { recipe, loading, error } = useGetRecipeById(id);

  if (loading) {
    return (
      <div className="h-screen font-bold text-[24px] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen font-bold text-[24px] flex justify-center items-center">
        Something went wrong!
      </div>
    );
  }

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  const videoId = recipe.strYoutube.split("v=")[1];

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">{`Recipe ${recipe.strMeal}`}</h1>
      <div className="flex flex-col ">
        <p>
          <span className="font-bold">Category: </span>
          {recipe.strCategory}
        </p>
        <p>
          <span className="font-bold">Area: </span>
          {recipe.strArea}
        </p>
      </div>
      <div className="flex gap-4">
        <div>
          <img src={`${recipe.strMealThumb}`} className="w-[500px] rounded-xl" alt="" />
        </div>

        <div>
          <span className="font-bold">Ingredients: </span>

          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient} {item.measure && `- ${item.measure}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="flex justify-center items-center font-bold">Recipe Video:</p>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Recipe Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p>
        <span className="font-bold">Tags: </span>
        {recipe.strTags ? recipe.strTags : "none"}
      </p>
    </div>
  );
}
