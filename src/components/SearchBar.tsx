import { useState } from "react";
import { useDebouncedSearch } from "../utils/useDebounce";
import { Recipe } from "../utils/useGetRecipeById";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const result = useDebouncedSearch(value, 1000);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <input
        className="text-white bg-inherit border-white border-2 border-solid rounded-xl px-5 focus:outline-none w-[300px] "
        placeholder="Search..."
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute bg-[#f5f5f1] top-14 w-[300px]">
        <ul className="flex flex-col gap-5">
          {result.length > 0 &&
            Array.isArray(result) &&
            result.map((item: Recipe) => {
              return (
                <Link
                  to={`/Recipe/${item.idMeal}`}
                  key={item.idMeal}
                  onClick={() => setValue("")}
                  className="flex shadow-md z-50 justify-center items-center bg-[#fff]"
                >
                  <img src={item.strMealThumb} className="w-[80px] rounded-lg " />
                  <li className="hover:cursor-pointer font-bold flex-1 hover:underline text-black">
                    {item.strMeal}
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
