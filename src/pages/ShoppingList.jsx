import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const ShoppingListPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
                // Add a `checked` field if it doesn't exist in the database
                if (ingredient.checked === undefined) {
                  ingredient.checked = false;
                }
                allIngredients.push({
                  ...ingredient,
                  mealType,
                  mealKey,
                  ingredientIndex: index, // To identify ingredient
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
      // Toggle the `checked` state
      const updatedChecked = !ingredient.checked;

      // Update the state locally for immediate feedback
      setIngredients((prevIngredients) =>
        prevIngredients.map((item) =>
          item === ingredient ? { ...item, checked: updatedChecked } : item
        )
      );

      // Update Firebase
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

  // Filter ingredients by search query
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shopping-list-page">
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
