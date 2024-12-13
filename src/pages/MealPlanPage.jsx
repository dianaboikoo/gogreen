import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import NavBar from "../components/NavBar";

const MealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Fetch the meal plan data from Firebase
    const fetchMealPlan = async () => {
      try {
        const response = await fetch("https://gogreen-b1a47-default-rtdb.firebaseio.com/MealPlan.json");
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
            <h3>
              {mealType} <button className="more-options">...</button>
            </h3>
            {Object.values(mealPlan[mealType]).map((meal, mealIndex) => {
              if (!meal || !meal.ID) return null; // Skip null or undefined meals
              return <MealItem key={meal.ID || mealIndex} meal={meal} />;
            })}
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

const MealItem = ({ meal }) => {
  if (!meal) return null; // Additional safeguard

  return (
    <Link to={`/recipe/${meal.ID}`} className="meal-item">
      <img src={meal.Picture} alt={meal.Name} className="meal-image" />
      <div className="meal-details">
        <h4>{meal.Name}</h4>
        <p>
          🕒 {meal.TimeOfCooking} • 🍴 {meal.NumberOfIngredients} ingredients
        </p>
      </div>
    </Link>
  );
};

export default MealPlanPage;
