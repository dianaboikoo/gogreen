import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const MealPlanPage = () => {
  // State for meal plan data, current date, and floating button options visibility
  const [mealPlan, setMealPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch meal plan data from Firebase
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan.json"
        );
        const data = await response.json();
        setMealPlan(data); // Save fetched data to state
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();

    // Get and format the current date
    const today = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  // Function to delete a meal from the meal plan
  const handleDeleteMeal = async (mealType, mealKey) => {
    try {
      // Delete meal from Firebase
      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan/${mealType}/${mealKey}.json`,
        { method: "DELETE" }
      );

      // Update local state after deletion
      setMealPlan((prevMealPlan) => {
        const updatedMealPlan = { ...prevMealPlan };
        delete updatedMealPlan[mealType][mealKey];
        return updatedMealPlan;
      });
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  // Show loading text while data is being fetched
  if (!mealPlan) {
    return <p>Loading...</p>;
  }

  // Define the order of meal types
  const mealTypeOrder = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="meal-plan-page">
      {/* Header with navigation buttons and date display */}
      <header className="meal-plan-header">
        <button className="nav-button">{"<"}</button>
        <div className="date-display">
          <h2>Today</h2>
          <p>{currentDate}</p>
        </div>
        <button className="nav-button">{">"}</button>
      </header>

      {/* Meal Plan Container */}
      <div className="meal-plan-container">
        {Object.keys(mealPlan)
          .sort((a, b) => mealTypeOrder.indexOf(a) - mealTypeOrder.indexOf(b)) // Sort meal types in order
          .map((mealType, index) => (
            <div key={index} className="meal-section">
              <h3>{mealType}</h3>
              <div className="meal-items">
                {Object.entries(mealPlan[mealType]).map(([mealKey, meal]) => {
                  if (!meal || !meal.ID) return null; // Skip invalid meals
                  return (
                    <MealItem
                      key={mealKey}
                      mealType={mealType}
                      mealKey={mealKey}
                      meal={meal}
                      onDelete={handleDeleteMeal}
                    />
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Floating Button and Options */}
      <div className="floating-button-container">
        <button
          className="floating-button"
          onClick={() => setShowOptions(!showOptions)} // Toggle options visibility
        >
          +
        </button>
        {showOptions && (
          <div className="floating-options">
            <button
              className="floating-option"
              onClick={() => navigate("/saved")} // Navigate to Saved Recipes
            >
              📖 Saved Recipes
            </button>
            <button
              className="floating-option"
              onClick={() => navigate("/search")} // Navigate to Search
            >
              🔍 Explore Recipes
            </button>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

// MealItem Component: Represents individual meals in the meal plan
const MealItem = ({ mealType, mealKey, meal, onDelete }) => {
  if (!meal) return null; // Skip invalid meals

  return (
    <div className="meal-item">
      {/* Link to the recipe details page */}
      <Link to={`/recipe/${meal.ID}`} className="meal-link">
        <img src={meal.Picture} alt={meal.Name} className="meal-image" />
        <div className="meal-details">
          <h4>{meal.Name}</h4>
          <p>
            🕒 {meal.TimeOfCooking} <p></p> 🍴 {meal.NumberOfIngredients} ingredients
          </p>
        </div>
      </Link>
      {/* Delete button to remove meal from meal plan */}
      <button
        className="delete-button"
        onClick={() => onDelete(mealType, mealKey)}
      >
        🗑️
      </button>
    </div>
  );
};

export default MealPlanPage;
