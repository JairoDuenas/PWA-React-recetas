import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Recipe } from "../pages/Recipe";
import { Timer } from "../pages/Timer";

export function MyRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<Recipe />} />
        <Route path="/" element={<Timer />} />
      </Route>
    </Routes>
  );
}
