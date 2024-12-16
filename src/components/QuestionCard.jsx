import PropTypes from "prop-types";
import "../styles/styles.css"; // Import CSS

const QuestionCard = ({ question, options, onOptionSelect, selectedOptions }) => {
  return (
    <div className="question-card">
      <h2 className="question-title">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedOptions.includes(option) ? "selected" : ""
            }`}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionCard;
