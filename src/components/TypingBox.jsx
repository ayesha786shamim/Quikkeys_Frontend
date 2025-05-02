import { useState, useEffect } from 'react';

// TypingBox component allows the user to type a paragraph and tracks their typing speed and accuracy.
// It fetches a new paragraph based on the difficulty level and calculates WPM (Words Per Minute), accuracy, and errors.

export default function TypingBox({ difficulty, onStatsChange }) {
  // State variables to manage the target text, user's input, and test start time.
  const [targetText, setTargetText] = useState(''); // The paragraph the user will type
  const [userInput, setUserInput] = useState(''); // The input typed by the user
  const [start, setStart] = useState(null); // Timestamp for when the user starts typing

  // Function to fetch a new paragraph from the backend API based on the selected difficulty level.
  const fetchParagraph = async () => {
    // Make a request to the backend to fetch a new paragraph based on difficulty
    const res = await fetch(`http://localhost:5000/api/paragraph?difficulty=${difficulty}`);
    const data = await res.json();
    
    // Set the fetched paragraph as the target text and reset the user's input and stats
    setTargetText(data.paragraph);
    setUserInput('');
    
    // Reset stats to initial values (WPM: 0, Errors: 0, Accuracy: 100%)
    onStatsChange({ wpm: 0, errors: 0, accuracy: 100 });
    setStart(null); // Reset the start time
  };

  // useEffect hook that triggers when the difficulty level changes.
  useEffect(() => {
    fetchParagraph(); // Fetch a new paragraph whenever difficulty changes
  }, [difficulty]); // Dependency on the `difficulty` prop

  // Handle change in user's input during typing.
  const handleChange = (e) => {
    const val = e.target.value; // Get the current user input
    if (!start) setStart(Date.now()); // Set the start time when the user starts typing
    
    setUserInput(val); // Update the user input state

    const elapsed = (Date.now() - start) / 60000; // Calculate elapsed time in minutes
    const words = val.trim().split(/\s+/).length; // Count words in the user input
    const wpm = Math.round(words / elapsed || 0); // Calculate words per minute (WPM)

    // Calculate errors based on the difference between user input and target text
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) errors++; // Count mismatches
    }

    // Calculate accuracy as a percentage (higher accuracy is better)
    const accuracy = Math.max(0, 100 - (errors / (val.length || 1)) * 100);

    // Pass the updated stats (WPM, errors, accuracy) to the parent component via onStatsChange
    onStatsChange({ wpm, errors, accuracy: Math.round(accuracy) });
  };

  // Render the target text with color-coded feedback based on the user's input.
  const renderColoredText = () => {
    const chars = targetText.split(''); // Split target text into individual characters
    return chars.map((char, idx) => {
      let className = '';
      
      // Color-code the characters based on user input
      if (idx < userInput.length) {
        className = char === userInput[idx] ? 'correct' : 'incorrect'; // Correct or incorrect
      } else if (idx === userInput.length) {
        className = 'current'; // Highlight the current character the user is typing
      }

      // Return a span with the appropriate class to apply color
      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-box">
      {/* Display the target text with color feedback */}
      <div className="target-text">{renderColoredText()}</div>
      
      {/* Textarea where user types their input */}
      <textarea
        value={userInput} // Bind user input to state
        onChange={handleChange} // Handle input change
        rows={4} // Define rows for the textarea
        placeholder="Start typing..." // Placeholder text
      />
      
      {/* Button to fetch a new test */}
      <div style={{ textAlign: 'center' }}>
        <button className="new-btn" onClick={fetchParagraph}>New Test</button>
      </div>
    </div>
  );
}
