import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved.json"
        );
        const data = await response.json();

        // Convert the saved recipes into an array for easy rendering
        const recipeList = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setSavedRecipes(recipeList);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleUnsave = async (id) => {
    try {
      // Remove the recipe from the saved section in the database
      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${id}.json`,
        {
          method: "DELETE",
        }
      );

      // Update the local state to reflect the changes
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error unsaving the recipe:", error);
    }
  };

  return (
    <div className="saved-recipes-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      <h3>Saved Recipes </h3>
      
      <div className="recipe-cards">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
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
              </div>
            </Link>
            <button
              className="save-button unsave"
              onClick={() => handleUnsave(recipe.id)}
            >
              Unsave
            </button>
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default SavedRecipesPage;
