import { Route, Routes } from "react-router-dom";
import RecipeDescription from "./pages/RecipeDescription";
import MealPlanPage from "./pages/MealPlanPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SavedRecepiesPage from "./pages/SavedRecipiesPage";



function App() {
  return (
    <main>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDescription />} />
        <Route path="/mealplan" element={<MealPlanPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/saved" element={<SavedRecepiesPage />} />
      </Routes>
    </main>
  );
}

export default App;
