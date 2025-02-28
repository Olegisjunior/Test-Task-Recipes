import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f1f6f5]">
      <h1 className="text-4xl font-bold text-black mb-4 text-center">Welcome to Recipes Website</h1>
      <p className="text-xl text-black mb-8 text-center max-w-2xl px-4">
        Discover the best recipes for every occasion, tailored just for you. Explore our collection
        and find what you need today!
      </p>
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all">
          <Link to={"/Recipes/1"}>To recipes</Link>
        </button>
      </div>
    </div>
  );
}
