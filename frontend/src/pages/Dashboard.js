import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/report/0");
        const sortedCrimes = response.data.data.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
        setCrimes(sortedCrimes);
      } catch (error) {
        console.error("Failed to fetch crimes: ", error);
      }
    };

    fetchCrimes();
  }, []);

  const handleResolveCrime = async (crimeId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/report/${crimeId}`);

      if (response.status === 200 && response.data.data) {
        const updatedCrimes = crimes.map((crime) =>
          crime.id === crimeId ? { ...crime, status: "Resolved" } : crime
        );
        setCrimes(updatedCrimes);
      }
    } catch (error) {
      console.error("Failed to resolve crime: ", error);
      // Handle error here, e.g., show an error message to the user
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 min-h-screen p-8">
       <div className="mt-8 flex flex-col sm:flex-row justify-between">
          <Link
            to="/dashboard/add-crime"
            className="bg-white text-red-500 py-2 px-4 rounded-md mb-2 sm:mb-0 hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-red-700"
          >
            Add Crime
          </Link>
          <Link
            to="/add-crime-scene"
            className="bg-white text-red-500 py-2 px-4 rounded-md mb-2 sm:mb-0 hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-red-700"
          >
            Add Crime Scene
          </Link>
          
        </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Crime Dashboard</h2>

        {crimes.length === 0 ? (
          <p className="text-gray-700">No crimes reported.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-md overflow-hidden">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Name</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Crime Scene</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Reporter</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Date Created</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Status</th>
                  <th className="py-2 px-4 sm:px-6 md:px-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {crimes.map((crime) => (
                  <tr key={crime.id} className="border-b">
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.name}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.scene}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.reporter}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.dateReported}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">{crime.status}</td>
                    <td className="py-2 px-4 sm:px-6 md:px-8">
                      {crime.status === "Pending" && (
                        <button
                          onClick={() => handleResolveCrime(crime.id)}
                          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700"
                        >
                          Resolve Crime
                        </button>
                      )}
                    </td>
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

export default Dashboard;
