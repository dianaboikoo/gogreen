import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedRecipes, setSavedRecipes] = useState({}); // Track saved recipes from the database

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/recipes.json"
        );
        const data = await response.json();

        const recipeList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRecipes(recipeList);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved.json"
        );
        const data = await response.json();
        setSavedRecipes(data || {}); // Ensure the savedRecipes is not null
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const handleSaveToggle = async (recipe) => {
    const isSaved = savedRecipes[recipe.id];
    try {
      if (isSaved) {
        // Remove from saved recipes
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${recipe.id}.json`,
          { method: "DELETE" }
        );
      } else {
        // Add to saved recipes
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${recipe.id}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe),
          }
        );
      }
      // Update local saved recipes state
      setSavedRecipes((prev) => {
        const updated = { ...prev };
        if (isSaved) {
          delete updated[recipe.id];
        } else {
          updated[recipe.id] = recipe;
        }
        return updated;
      });
    } catch (error) {
      console.error("Error toggling save state:", error);
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.Name && recipe.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      {/* SearchBar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Popular Section */}
      <div className="popular-section">
        <h3>Popular</h3>
        <div className="popular-categories">
          <div className="category-card">
            <img src="/chicken_section.jpg" alt="Chicken" className="category-image" />
            <span>Chicken</span>
          </div>
          <div className="category-card">
            <img src="/healthy_section.jpg" alt="Healthy" className="category-image" />
            <span>Healthy</span>
          </div>
          <div className="category-card">
            <img src="/pasta_section.jpg" alt="Pasta" className="category-image" />
            <span>Pasta</span>
          </div>
          <div className="category-card">
            <img src="/salmon_section.jpg" alt="Salmon" className="category-image" />
            <span>Salmon</span>
          </div>
          <div className="category-card">
            <img src="/breakfast_section.jpg" alt="Breakfast" className="category-image" />
            <span>Breakfast</span>
          </div>
          <div className="category-card">
            <img src="/dinner_section.jpg" alt="Dinner" className="category-image" />
            <span>Dinner</span>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="recommended-section">
        <h3>Recommended</h3>
        <div className="recipe-cards">
          {filteredRecipes.map((recipe) => {
            const isSaved = !!savedRecipes[recipe.id];
            return (
              <div key={recipe.id} className="recipe-card">
                <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
                  <div className="recipe-image-container">
                    <img
                      src={recipe.Picture}
                      alt={recipe.Name}
                      className="recipe-image"
                    />
                  </div>
                  <div className="recipe-info">
                    <h4 className="recipe-name">{recipe.Name}</h4>
                    <div className="recipe-details">
                      <span>🕒 {recipe.TimeOfCooking}</span>
                      <span>🍴 {recipe.NumberOfIngredients} ingredients</span>
                    </div>
                  </div>
                </Link>
                <button
                  className={`save-button ${isSaved ? "saved" : ""}`}
                  onClick={() => handleSaveToggle(recipe)}
                >
                  {isSaved ? "Unsave" : "Save"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default SearchPage;
