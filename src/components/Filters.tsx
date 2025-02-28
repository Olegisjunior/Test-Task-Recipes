import { useSearchParams } from "react-router-dom";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterType: "category" | "area", value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    setSearchParams(newParams);
  };

  return (
    <aside className="flex gap-5 mb-5 flex-col items-center h-screen w-[150px] bg-[#f1f5f4] ">
      <label htmlFor="category" className="font-bold">
        Category
      </label>
      <select
        onChange={(e) => handleFilterChange("category", e.target.value)}
        value={searchParams.get("category") || ""}
      >
        <option value="">All Categories</option>
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
        <option value="Dessert">Dessert</option>
        <option value="Pasta">Pasta</option>
        <option value="Vegan">Vegan</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Starter">Starter</option>
        <option value="Side">Side</option>
        <option value="Seafood">Seafood</option>
      </select>
      <label htmlFor="area" className="font-bold">
        Area
      </label>
      <select
        onChange={(e) => handleFilterChange("area", e.target.value)}
        value={searchParams.get("area") || ""}
      >
        <option value="">All Areas</option>
        <option value="American">American</option>
        <option value="British">British</option>
        <option value="Italian">Italian</option>
        <option value="Chinese">Chinese</option>
        <option value="Japanese">Japanese</option>
        <option value="Polish">Polish</option>
        <option value="Ukrainian">Ukrainian</option>
      </select>
    </aside>
  );
};
