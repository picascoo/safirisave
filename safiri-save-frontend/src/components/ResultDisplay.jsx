import React from 'react';
import QuoteCard from './QuoteCard';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';

export default function ResultsDisplay({ isLoading, error, routeDetails, quotes, cheapestQuote, fastestQuote }) {
  if (isLoading) return <div className="mt-10"><LoadingSpinner /></div>;
  if (error) return <div className="mt-10"><ErrorMessage message={error} /></div>;
  if (!quotes || quotes.length === 0) return null;

  return (
    <div className="mt-8 max-w-3xl mx-auto px-4 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div>
          <p className="text-xs font-bold text-[#4285F4] uppercase tracking-wide">Distance</p>
          <p className="font-semibold text-gray-700">{routeDetails.distanceText}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-[#4285F4] uppercase tracking-wide">Est. Time</p>
          <p className="font-semibold text-gray-700">{routeDetails.durationText}</p>
        </div>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.serviceName}
            quote={quote}
            isCheapest={quote.estimatedPrice === cheapestQuote.estimatedPrice}
            isFastest={quote.etaMinutes === fastestQuote.etaMinutes}
          />
        ))}
      </div>
    </div>
  );
}