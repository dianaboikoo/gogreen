import { Route, Routes } from "react-router-dom";
import RecipeDescription from "./pages/RecipeDescription";
import MealPlanPage from "./pages/MealPlanPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SavedRecepiesPage from "./pages/SavedRecipiesPage";
import ShoppingList from "./pages/ShoppingList"
import Onboarding from "./pages/Onboarding"



function App() {
  return (
    <main>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDescription />} />
        <Route path="/mealplan" element={<MealPlanPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/saved" element={<SavedRecepiesPage />} />
        <Route path="/shoppinglist" element={<ShoppingList/>} />
        <Route path="/onboarding" element={<Onboarding/>} />
      </Routes>
    </main>
  );
}

export default App;
