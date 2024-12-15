import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const MealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [showOptions, setShowOptions] = useState(false); // State for floating button options
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the meal plan data from Firebase
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(
          "https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan.json"
        );
        const data = await response.json();
        setMealPlan(data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();

    // Get the current date
    const today = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  const handleDeleteMeal = async (mealType, mealKey) => {
    try {
      await fetch(
        `https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan/${mealType}/${mealKey}.json`,
        { method: "DELETE" }
      );

      // Update the state after deletion
      setMealPlan((prevMealPlan) => {
        const updatedMealPlan = { ...prevMealPlan };
        delete updatedMealPlan[mealType][mealKey];
        return updatedMealPlan;
      });
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  if (!mealPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="meal-plan-page">
  <header className="meal-plan-header">
    <button className="nav-button">{"<"}</button>
    <div className="date-display">
      <h2>Today</h2>
      <p>{currentDate}</p>
    </div>
    <button className="nav-button">{">"}</button>
  </header>

  <div className="meal-plan-container">
    {Object.keys(mealPlan).map((mealType, index) => (
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
      onClick={() => setShowOptions(!showOptions)}
    >
      +
    </button>
    {showOptions && (
      <div className="floating-options">
        <button
          className="floating-option"
          onClick={() => navigate("/saved")}
        >
          📖 Saved Recipes
        </button>
        <button
          className="floating-option"
          onClick={() => navigate("/search")}
        >
          🔍 Explore Recipes
        </button>
      </div>
    )}
  </div>

  <NavBar />
</div>

  );
};

const MealItem = ({ mealType, mealKey, meal, onDelete }) => {
  if (!meal) return null; // Additional safeguard

  return (
    <div className="meal-item">
      <Link to={`/recipe/${meal.ID}`} className="meal-link">
        <img src={meal.Picture} alt={meal.Name} className="meal-image" />
        <div className="meal-details">
          <h4>{meal.Name}</h4>
          <p>
            🕒 {meal.TimeOfCooking} <p></p> 🍴 {meal.NumberOfIngredients} ingredients
          </p>
        </div>
      </Link>
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
