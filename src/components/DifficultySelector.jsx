// DifficultySelector component allows users to select the difficulty level for paragraph generation.
// Props:
// - selected: The currently selected difficulty level (string: 'easy', 'medium', or 'hard').
// - onSelect: A callback function that gets triggered when a difficulty button is clicked. It passes the selected level.

export default function DifficultySelector({ selected, onSelect }) {
    return (
      <div className="difficulty-selector">
        {/* Map over an array of difficulty levels (easy, medium, hard) */}
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level} // Key helps React to identify and manage components in the list efficiently
            onClick={() => onSelect(level)} // Trigger the onSelect callback with the selected level when clicked
            className={`difficulty-button ${selected === level ? 'active' : ''}`} // Add 'active' class if the current level is selected
          >
            {/* Display the level with the first letter capitalized */}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    );
  }
  