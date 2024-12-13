import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved.json"
        );
        const data = await response.json();

        if (data) {
          const savedList = Object.keys(data).map((key) => ({
            id: key, // Save the unique database key for removing the recipe later
            ...data[key],
          }));
          setSavedRecipes(savedList);
        }
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Function to handle Unsave
  const handleUnsave = async (recipeId) => {
    try {
      // Find the database key for the recipe to remove
      const recipeToRemove = savedRecipes.find((recipe) => recipe.ID === recipeId);
      if (!recipeToRemove) return;

      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${recipeToRemove.id}.json`,
        {
          method: "DELETE",
        }
      );

      // Remove the recipe locally
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.ID !== recipeId)
      );

      alert("Recipe removed from saved recipes!");
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  return (
    <div className="saved-recipes-page">
      <h3>Saved Recipes</h3>
      <div className="recipe-cards">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-card-link"></Link>
            <img
              src={recipe.Picture}
              alt={recipe.Name}
              className="recipe-card-image"
            />
            <div className="recipe-card-content">
              <h4 className="recipe-card-title">{recipe.Name}</h4>
              <div className="recipe-card-details">
                <span>🕒 {recipe.TimeOfCooking}</span>
                <span>🍴 {recipe.NumberOfIngredients} ingredients</span>
              </div>
              
              <button
                className="save-button unsave"
                onClick={() => handleUnsave(recipe.ID)}
              >
                Unsave
              </button>
            </div>
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default SavedRecipesPage;
