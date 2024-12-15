import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const RecipeDescription = () => {
  const [recipe, setRecipe] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const { id } = useParams(); // Get the recipe ID from the route parameters
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate(); // Use the navigate function from useNavigate

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/recipes/${id}.json`
        );
        const data = await response.json();
        setRecipe(data);

        // Check if the recipe is already saved
        const savedResponse = await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${id}.json`
        );
        const savedData = await savedResponse.json();
        setIsSaved(!!savedData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        // Unsave the recipe
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${id}.json`,
          {
            method: "DELETE",
          }
        );
        setIsSaved(false);
      } else {
        // Save the recipe
        await fetch(
          `https://gogreen-b1a47-default-rtdb.firebaseio.com/Saved/${id}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ID: recipe.ID,
              Name: recipe.Name,
              Picture: recipe.Picture,
              TimeOfCooking: recipe.TimeOfCooking,
              Level: recipe.Level,
              NumberOfIngredients: recipe.NumberOfIngredients,
            }),
          }
        );
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving or unsaving recipe:", error);
    }
  };

 const handlePlanMeal = async (mealType) => {
  try {
    const mealData = {
      ID: recipe.ID,
      Name: recipe.Name,
      Picture: recipe.Picture,
      TimeOfCooking: recipe.TimeOfCooking,
      Level: recipe.Level,
      NumberOfIngredients: recipe.NumberOfIngredients,
      Ingredients: recipe.Ingredients, // Include all ingredients here
    };

    await fetch(
      `https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan/${mealType}.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealData),
      }
    );

    alert(`${recipe.Name} added to ${mealType}!`);
    setShowOverlay(false);
  } catch (error) {
    console.error("Error adding meal to database:", error);
  }
};


  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-page">
      {/* Header Section */}
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <img src={recipe.Picture} alt={recipe.Name} className="recipe-image" />
        <h2 className="recipe-name">{recipe.Name}</h2>
        <div className="recipe-details">
          <span>🕒 {recipe.TimeOfCooking}</span>
          <span>⭐ {recipe.Level}</span>
        </div>

        {/* Save and Plan Buttons */}
        <div>
          <button className={isSaved ? "unsave-button" : "save-button"} onClick={handleSaveToggle}>
            {isSaved ? "Unsave" : "Save"}
          </button>
          <button onClick={() => setShowOverlay(true)}>Plan</button>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Plan this meal for:</h3>
            <button onClick={() => handlePlanMeal("Breakfast")}>Breakfast</button>
            <button onClick={() => handlePlanMeal("Lunch")}>Lunch</button>
            <button onClick={() => handlePlanMeal("Dinner")}>Dinner</button>
            <button onClick={() => setShowOverlay(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={activeTab === "ingredients" ? "active-tab" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </button>
        <button
          className={activeTab === "instructions" ? "active-tab" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
        <button
          className={activeTab === "nutrition" ? "active-tab" : ""}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrition
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "ingredients" && (
        <div className="tab-content">
          <h3>Ingredients</h3>
          <p>Servings: 3</p>
          <ul>
            {recipe.Ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <img
                  src={ingredient.Picture}
                  alt={ingredient.Name}
                  className="ingredient-image"
                />
                <span>
                  {ingredient.Quantity} {ingredient.Name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "instructions" && (
        <div className="tab-content">
          <h3>Instructions</h3>
          {Object.entries(recipe.Instructions).map(([step, text]) => (
            <p key={step}>
              <strong>{step}</strong>: {text}
            </p>
          ))}
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="tab-content">
          <h3>Nutrition per serving</h3>
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(recipe.Nutrition).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default RecipeDescription;
