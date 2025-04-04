import React, { useState, useEffect } from 'react';

const PdfSyllabusPurchasers = () => {
  const [purchasers, setPurchasers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/pdfsyllabuspurchasers');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch data');
        }
        
        // Convert object of objects to array
        const purchasersArray = result.data ? 
          Object.keys(result.data).map(key => ({
            id: key,
            ...result.data[key]
          })) : [];
        
        setPurchasers(purchasersArray);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching purchasers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-8">Loading purchaser data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Error loading purchasers: {error}</p>
        <p>Please try again later or contact support.</p>
      </div>
    );
  }

  if (purchasers.length === 0) {
    return <div className="p-4 text-gray-700">No purchaser records found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">PDF Syllabus Purchasers</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Purchase Date</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchasers.map((purchaser) => (
              <tr key={purchaser.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {purchaser.name || purchaser.fullName || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">{purchaser.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {purchaser.purchaseDate || purchaser.date 
                    ? new Date(purchaser.purchaseDate || purchaser.date).toLocaleDateString() 
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">
                  {purchaser.amount 
                    ? `$${parseFloat(purchaser.amount).toFixed(2)}` 
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    purchaser.status === 'completed' ? 'bg-green-100 text-green-800' :
                    purchaser.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {purchaser.status || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Total Records: {purchasers.length}
      </div>
    </div>
  );
};

export default PdfSyllabusPurchasers;