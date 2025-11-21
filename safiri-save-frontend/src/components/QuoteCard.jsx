import React from 'react';

export default function QuoteCard({ quote, isCheapest, isFastest }) {
  // Dynamic styling based on badges
  const borderClass = isCheapest ? 'border-[#34A853] border-2' : isFastest ? 'border-[#FBBC05] border-2' : 'border-transparent';
  
  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border ${borderClass} relative flex justify-between items-center`}>
      
      {/* Badges */}
      <div className="absolute -top-3 right-4 flex gap-2">
        {isCheapest && <span className="bg-[#34A853] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">CHEAPEST</span>}
        {isFastest && !isCheapest && <span className="bg-[#FBBC05] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">FASTEST</span>}
      </div>

      <div className="flex items-center gap-4">
        {/* Logo Placeholder */}
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={quote.logoUrl} alt={quote.serviceName} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{quote.serviceName}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {quote.etaMinutes} mins away
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-2xl font-extrabold text-gray-900">
          <span className="text-sm text-gray-500 font-normal mr-1">KES</span>
          {quote.estimatedPrice}
        </p>
        {quote.surge && (
          <p className="text-xs font-bold text-[#EA4335] bg-red-50 px-2 py-0.5 rounded inline-block">
             High Demand
          </p>
        )}
      </div>
    </div>
  );
}