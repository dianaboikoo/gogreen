import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const ShoppingListPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan.json"
        );
        const data = await response.json();

        const allIngredients = [];
        for (const mealType in data) {
          for (const mealKey in data[mealType]) {
            const meal = data[mealType][mealKey];
            if (meal.Ingredients) {
              meal.Ingredients.forEach((ingredient, index) => {
                allIngredients.push({
                  ...ingredient,
                  checked: ingredient.checked ?? false, // Safely add `checked`
                  mealType,
                  mealKey,
                  ingredientIndex: index,
                });
              });
            }
          }
        }
        setIngredients(allIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleCheckboxChange = async (ingredient) => {
    const { mealType, mealKey, ingredientIndex } = ingredient;

    try {
      const updatedChecked = !ingredient.checked;

      setIngredients((prevIngredients) =>
        prevIngredients.map((item) =>
          item === ingredient ? { ...item, checked: updatedChecked } : item
        )
      );

      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan/${mealType}/${mealKey}/Ingredients/${ingredientIndex}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checked: updatedChecked }),
        }
      );
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shopping-list-page">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Ingredients List */}
      <ul className="ingredients-list">
        {filteredIngredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            <img
              src={ingredient.Picture}
              alt={ingredient.Name}
              className="ingredient-image"
            />
            <span>
              {ingredient.Name} {ingredient.Quantity}
            </span>
            <input
              type="checkbox"
              checked={ingredient.checked}
              onChange={() => handleCheckboxChange(ingredient)}
            />
          </li>
        ))}
      </ul>
      <NavBar />
    </div>
  );
};

export default ShoppingListPage;
