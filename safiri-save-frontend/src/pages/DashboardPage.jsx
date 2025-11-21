import React, { useEffect, useState } from 'react';
import { useAuth } from '/src/context/AuthContext.jsx';
import { BACKEND_URL } from '/src/constants.js';
import LoadingSpinner from '/src/components/common/LoadingSpinner.jsx';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/user/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {user?.name}!</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Favorite Routes */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-[#4285F4] mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Favorite Routes
          </h2>
          {data?.favorites?.length ? (
            <ul className="divide-y">
              {data.favorites.map(fav => (
                <li key={fav._id} className="py-3 text-gray-600">
                  <span className="font-bold text-gray-800 block">{fav.name}</span>
                  {fav.originAddress} → {fav.destinationAddress}
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-400 italic">No favorite routes saved yet.</p>}
        </div>

        {/* History */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-[#34A853] mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Recent History
          </h2>
          {data?.history?.length ? (
            <ul className="divide-y">
              {data.history.map(item => (
                <li key={item._id} className="py-3">
                  <div className="text-sm text-gray-500 mb-1">{new Date(item.createdAt).toLocaleDateString()}</div>
                  <div className="font-medium text-gray-800">{item.originAddress} → {item.destinationAddress}</div>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-400 italic">No search history yet.</p>}
        </div>
      </div>
    </div>
  );
}