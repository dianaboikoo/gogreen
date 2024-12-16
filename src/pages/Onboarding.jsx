import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const navigate = useNavigate();

  const questions = [
    { question: "What goals would you like to start with?", options: ["Eat healthier", "Save time and simplify meal prep", "Incorporate more whole foods", "Build a sustainable meal plan", "Support fitness and energy needs"] },
    { question: "What meals do you typically plan?", options: ["Breakfast", "Lunch", "Dinner", "Snacks", "Takeout"] },
    { question: "Do you have a special diet?", options: ["Keto", "Vegan", "Paleo", "Low Carb", "Vegetarian", "Dairy Free", "Pescatarian", "Gluten Free", "Mediterranean", "Ovo Vegetarian", "Lacto Vegetarian", "Ovo-Lacto Vegetarian"] },
    { question: "Are you avoiding any ingredients?", options: ["Egg", "Fish", "Milk", "Wheat", "Yeast", "Celery", "Gluten", "Sesame", "Alcohol", "Mollusc", "Mustard", "Soybean", "Lactose", "Caffeine", "Tree Nut", "Groundnut", "Sulphites", "Crustacean"] },
    { question: "Any cuisines you like?", options: ["American", "Mediterranean", "Mexican", "Asian", "Italian", "Chinese", "Indian", "Japanese"] },
    { question: "How would you rate your cooking skills?", options: ["Beginner", "Intermediate", "Advanced"] },
    { question: "Do you have any allergies?", options: ["Dairy", "Egg", "Fish", "Sulphites", "Mustard", "Flax", "Sesame", "Gluten", "Meat", "Lupin", "Peanuts", "Soya", "Shellfish", "Tree nuts", "Celery"] },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option) // Deselect
        : [...prevSelected, option] // Select
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setSelectedOptions([]); // Reset selection for new step
    }
    else {
      navigate("/mealplan"); // Navigate to MealPlan page when finished
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedOptions([]); // Reset selection for previous step
    }
  };

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setSelectedOptions([]); // Reset selection for new step
    }
  };

  return (
    <div className="onboarding-container">
      {/* Progress Bar */}
      <ProgressBar step={step} totalSteps={totalSteps} />

<div className="navigation-buttons">
        {step > 1 && (
          <button className="nav-button prev" onClick={handlePrevious}>
            Previous
          </button>
        )}
        <button className="nav-button skip" onClick={handleSkip}>
          Skip
        </button>
      </div>

      {/* Question Content */}
      <QuestionCard
        question={questions[step - 1]?.question}
        options={questions[step - 1]?.options || []}
        onOptionSelect={handleOptionSelect}
        selectedOptions={selectedOptions}
      />

      {/* Navigation Buttons */}
      <div className="navigation-next-button">
        <button className="nav-button next" onClick={handleNext}>
          {step === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
