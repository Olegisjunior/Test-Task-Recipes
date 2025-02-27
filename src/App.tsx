import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Recipe } from "./Pages/Recipe";
import { ListRecipes } from "./Pages/ListRecipes";
import { Nav } from "./components/Nav";
import { Home } from "./Pages/Home";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Recipe/:id" element={<Recipe />} />
          <Route path="/Recipes/:page" element={<ListRecipes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
