// StatsBox component displays various statistics (WPM, Accuracy, Errors) during the typing test.
// It receives a 'stats' object as a prop, which contains the values for these statistics.
export default function StatsBox({ stats }) {
    return (
      <div className="stats">
        {/* Card for displaying Words Per Minute (WPM) */}
        <div className="card">
          <p className="value">{stats?.wpm || 0}</p> {/* Display WPM, default to 0 if not available */}
          <p className="label">WPM</p> {/* Label for the WPM stat */}
        </div>
  
        {/* Card for displaying Accuracy */}
        <div className="card">
          <p className="value">{stats?.accuracy || 100}%</p> {/* Display Accuracy, default to 100% if not available */}
          <p className="label">Accuracy</p> {/* Label for the accuracy stat */}
        </div>
  
        {/* Card for displaying Errors */}
        <div className="card">
          <p className="value">{stats?.errors || 0}</p> {/* Display number of Errors, default to 0 if not available */}
          <p className="label">Errors</p> {/* Label for the errors stat */}
        </div>
      </div>
    );
  }
  