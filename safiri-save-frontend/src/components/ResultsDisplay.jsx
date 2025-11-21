import React from "react";

const ResultsDisplay = ({ results, loading, error }) => {
  if (loading) {
    return (
      <div className="results-display">
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-display error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-display empty">
        <p>No results to display.</p>
      </div>
    );
  }

  return (
    <div className="results-display">
      <h2>Search Results</h2>
      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <h3>{result.title || `Result ${index + 1}`}</h3>
            <p>{result.description || result.content}</p>
            {result.url && (
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                View Details
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;