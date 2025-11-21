import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10 w-full h-full">
      {/* - animate-spin: Tailwind utility for CSS rotation animation 
        - border-t-transparent: Creates the "gap" in the circle that makes the spin visible
      */}
      <div 
        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#4285F4', borderTopColor: 'transparent' }} // Use Google Blue
      ></div>
    </div>
  );
}