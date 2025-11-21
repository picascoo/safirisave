import React from "react";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message" style={{
      padding: "12px 16px",
      marginBottom: "16px",
      backgroundColor: "#fee",
      border: "1px solid #fcc",
      borderRadius: "4px",
      color: "#c33",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span>{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#c33",
            cursor: "pointer",
            fontSize: "18px",
            padding: "0 4px"
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;