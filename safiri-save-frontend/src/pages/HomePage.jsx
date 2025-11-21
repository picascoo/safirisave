import React, { useState, useMemo } from 'react';
import { BACKEND_URL } from '../constants';
import { useAuth } from '../context/AuthContext';
import SearchForm from '../components/SearchForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function HomePage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [routeDetails, setRouteDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const handleCompare = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error fetching prices');

      setQuotes(data.quotes);
      setRouteDetails(data.route);

      if (token) {
        fetch(`${BACKEND_URL}/api/user/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ originAddress: data.route.startAddress, destinationAddress: data.route.endAddress, quotes: data.quotes })
        }).catch(err => console.error("History log failed", err));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cheapestQuote = useMemo(() => quotes.length ? quotes.reduce((min, q) => q.estimatedPrice < min.estimatedPrice ? q : min, quotes[0]) : null, [quotes]);
  const fastestQuote = useMemo(() => quotes.length ? quotes.reduce((min, q) => q.etaMinutes < min.etaMinutes ? q : min, quotes[0]) : null, [quotes]);

  return (
    <div className="min-h-[80vh]">
      <div className="bg-[#4285F4] pb-20 pt-10 px-4 text-center rounded-b-[3rem] shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Move Smarter. Pay Less.</h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">Compare real-time prices from Uber, Bolt, Faras, and Little Cab instantly.</p>
      </div>
      <SearchForm origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} onSubmit={handleCompare} isLoading={isLoading} />
      <ResultsDisplay isLoading={isLoading} error={error} routeDetails={routeDetails} quotes={quotes} cheapestQuote={cheapestQuote} fastestQuote={fastestQuote} />
    </div>
  );
}