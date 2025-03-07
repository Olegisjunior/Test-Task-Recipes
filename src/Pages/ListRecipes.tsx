import { useEffect } from "react";
import { useFetchRecipes } from "../utils/useFetchRecipes";
import { CartRecipe } from "../components/CartRecipe";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { Filters } from "../components/Filters";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

export const ListRecipes = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const area = searchParams.get("area") || "";
  const { page = "1" } = useParams<{ page: string }>();
  const { recipes, loading, error } = useFetchRecipes(category, area);

  const currentPage = parseInt(page, 10);
  const navigate = useNavigate();

  const recipesPerPage = 6;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    if (currentPage < 1) {
      navigate("/recipes/1");
    }
  }, [currentPage, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="mb-10">
      <div className="flex">
        <Filters />
        <div className="flex flex-1 flex-col justify-center items-center mt-5 mb-5">
          <div className="grid max-w-[1280px] grid-cols-3 gap-5">
            {currentRecipes.map((recipe: Recipe) => (
              <CartRecipe key={recipe.strMeal} {...recipe} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(recipes.length / recipesPerPage)}
      />
    </div>
  );
};
