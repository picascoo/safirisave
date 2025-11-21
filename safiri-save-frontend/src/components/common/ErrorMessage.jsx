import React from 'react';

export default function ErrorMessage({ message }) {
  // If there is no message, don't render anything
  if (!message) return null;

  return (
    <div 
      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative mb-4 flex items-center shadow-sm animate-fadeIn"
      role="alert"
    >
      {/* Error Icon SVG */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2 flex-shrink-0" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      
      <span className="block sm:inline font-medium">{message}</span>
    </div>
  );
}