import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllCrimes = () => {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/crime/0");
        const sortedCrimes = response.data.data.crimes
        setCrimes(sortedCrimes);
      } catch (error) {
        console.error("Failed to fetch crimes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 min-h-screen p-8">
     
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Crime Codes</h2>

        {loading ? (
          <p className="text-gray-700">Loading...</p>
        ) : crimes.length === 0 ? (
          <p className="text-gray-700">No crime code available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-md overflow-hidden text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-2 px-4 sm:px-6 md:px-8">S/N</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Crime Name</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">USSD Code</th>
                </tr>
              </thead>
              <tbody>
                {crimes.map((crime, index) => (
                  <tr key={crime.id} className="border-b">
                    <td className="py-2 px-4 sm:px-6 md:px-8">{index + 1}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.name}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCrimes;
