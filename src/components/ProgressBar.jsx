import PropTypes from "prop-types";
import "../styles/styles.css"; // If you use styles

const ProgressBar = ({ step, totalSteps }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`progress-dot ${i < step ? "active" : ""}`}
        ></div>
      ))}
    </div>
  );
};

// Add PropTypes below the component declaration
ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
