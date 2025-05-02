import { useState } from 'react';
import Header from './components/Header'; // Header component displays the title and subtitle
import DifficultySelector from './components/DifficultySelector'; // Allows user to select difficulty level
import TypingBox from './components/TypingBox'; // Main typing input area with logic
import StatsBox from './components/StatsBox'; // Displays typing stats (WPM, accuracy, errors)
import './styles/main.css'; // Main CSS file for styling

// Root component of the Typing Speed Test application
export default function App() {
  // State for tracking the selected difficulty level (easy, medium, hard)
  const [difficulty, setDifficulty] = useState('easy');

  // State for tracking typing statistics
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });

  return (
    <div className="container">
      {/* Header displaying app title and description */}
      <Header />

      {/* Difficulty selector to choose typing difficulty */}
      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

      {/* Typing box where the user types the paragraph */}
      <TypingBox difficulty={difficulty} onStatsChange={setStats} />

      {/* Stats box showing user's performance */}
      <StatsBox stats={stats} />
    </div>
  );
}
