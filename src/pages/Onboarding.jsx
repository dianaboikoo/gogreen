import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import "../styles/styles.css";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const totalSteps = questions.length; // Dynamic steps based on fetched questions
  const navigate = useNavigate();

  // Fetch questions and options from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      const db = getDatabase();
      const questionsRef = ref(db, "onboarding/steps"); // Path in your database
      try {
        const snapshot = await get(questionsRef);
        if (snapshot.exists()) {
          setQuestions(snapshot.val());
        } else {
          console.error("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

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
    } else {
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
    } else {
      navigate("/mealplan"); // Navigate to MealPlan page when finished
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

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
      {questions.length > 0 && (
        <QuestionCard
          question={questions[step - 1]?.question}
          options={questions[step - 1]?.options || []}
          onOptionSelect={handleOptionSelect}
          selectedOptions={selectedOptions}
        />
      )}

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
