import { Route, Routes } from "react-router-dom";
import RecipeDescription from "./pages/RecipeDescription";
import MealPlanPage from "./pages/MealPlanPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import SavedRecepiesPage from "./pages/SavedRecipiesPage";
import ShoppingList from "./pages/ShoppingList"



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
      </Routes>
    </main>
  );
}

export default App;
