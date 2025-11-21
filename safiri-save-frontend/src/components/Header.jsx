import React from 'react';

export default function SearchForm({ origin, setOrigin, destination, setDestination, onSubmit, isLoading }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-10 relative z-10 mx-4 md:mx-auto max-w-3xl border border-gray-100">
      <form onSubmit={onSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Pick Up</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. Westlands"
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-lg rounded-lg focus:ring-[#4285F4] focus:border-[#4285F4] block p-3"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Drop Off</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. JKIA Airport"
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-lg rounded-lg focus:ring-[#4285F4] focus:border-[#4285F4] block p-3"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto bg-[#4285F4] hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-[54px]"
          >
            {isLoading ? '...' : 'Compare'}
          </button>
        </div>
      </form>
    </div>
  );
}