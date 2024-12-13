import React, { useState } from "react";
import "../styles/styles.css";

const RecipeUICard = ({ recipe }) => {
  const [isSaved, setIsSaved] = useState(false);

  
  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        // Remove recipe from the saved section in Firebase
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${recipe.ID}.json`,
          { method: "DELETE" }
        );
      } else {
        // Save recipe to the saved section in Firebase
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${recipe.ID}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe),
          }
        );
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving/unsaving recipe:", error);
    }
  };

 return (
  <div className="recipe-card">
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
      <button className="save-button" onClick={handleSaveToggle}>
        {isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  </div>
);

};

export default RecipeUICard;
