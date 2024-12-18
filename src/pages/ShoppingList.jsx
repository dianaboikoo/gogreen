import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const ShoppingListPage = () => {
  const [ingredients, setIngredients] = useState([]); // State to hold the list of ingredients
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search query

  // Fetch the ingredients from the MealPlan section in Firebase
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan.json"
        );
        const data = await response.json();

        const allIngredients = []; // Temporary array to store all ingredients
        for (const mealType in data) {
          for (const mealKey in data[mealType]) {
            const meal = data[mealType][mealKey];
            if (meal.Ingredients) {
              // Add each ingredient to the array
              meal.Ingredients.forEach((ingredient, index) => {
                allIngredients.push({
                  ...ingredient, // Spread ingredient properties
                  checked: ingredient.checked ?? false, // Ensure a `checked` field is present
                  mealType, 
                  mealKey, 
                  ingredientIndex: index,
                });
              });
            }
          }
        }
        setIngredients(allIngredients); // Update the state with all ingredients
      } catch (error) {
        console.error("Error fetching ingredients:", error); // Log any errors
      }
    };

    fetchIngredients(); // Call the fetch function
  }, []);

  // Handle the checkbox toggle for an ingredient
  const handleCheckboxChange = async (ingredient) => {
    const { mealType, mealKey, ingredientIndex } = ingredient; // Destructure references for the ingredient

    try {
      const updatedChecked = !ingredient.checked; // Toggle the `checked` state

      // Update the local state optimistically
      setIngredients((prevIngredients) =>
        prevIngredients.map((item) =>
          item === ingredient ? { ...item, checked: updatedChecked } : item
        )
      );

      // Update the database with the new `checked` state
      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan/${mealType}/${mealKey}/Ingredients/${ingredientIndex}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checked: updatedChecked }),
        }
      );
    } catch (error) {
      console.error("Error updating ingredient:", error); // Log any errors
    }
  };

  // Filter ingredients based on the search query
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shopping-list-page">
      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Ingredients List */}
      <ul className="ingredients-list">
        {filteredIngredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            {/* Display the ingredient image */}
            <img
              src={ingredient.Picture}
              alt={ingredient.Name}
              className="ingredient-image"
            />
            {/* Display the ingredient name and quantity */}
            <span>
              {ingredient.Name} {ingredient.Quantity}
            </span>
            {/* Checkbox for marking the ingredient as checked/unchecked */}
            <input
              type="checkbox"
              checked={ingredient.checked}
              onChange={() => handleCheckboxChange(ingredient)}
            />
          </li>
        ))}
      </ul>
      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default ShoppingListPage;
