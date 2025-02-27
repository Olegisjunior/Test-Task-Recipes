import { Link } from "react-router-dom";
import { LikeModal } from "./modal/LikeModal";
import { useState } from "react";

export function Nav() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLikeRecipe = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="flex justify-center items-center gap-12 h-[80px] w-full bg-[#282828] text-white">
      <Link to="/" className="hover:underline font-bold text-[24px]">
        Home
      </Link>
      <Link to="/Recipes/1" className="hover:underline font-bold text-[24px]">
        List Recipes
      </Link>
      <input type="text" placeholder="Search for recipes" className="px-4 py-2 rounded-md" />
      <button onClick={handleLikeRecipe} className="hover:underline font-bold text-[24px]">
        Liked
      </button>

      <LikeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
}
