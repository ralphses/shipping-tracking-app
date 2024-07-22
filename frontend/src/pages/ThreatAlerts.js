import React, { useState, useEffect } from "react";

const ThreatAlerts = () => {
  const [threatAlerts, setThreatAlerts] = useState([]);
  const [sortOption, setSortOption] = useState("level");
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch threat data on component load
    fetchThreats();
  }, [currentPage, sortOption]);

  const fetchThreats = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/attack/threats/${currentPage}`);
      const data = await response.json();

      if (data.success) {
        setThreatAlerts(data.data.threats);
        setTotalPages(data.data.totalPages);
      } else {
        console.error("Error fetching threat data");
      }
    } catch (error) {
      console.error("Error fetching threat data:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset current page when changing the sort option
  };

  const handleViewThreat = (threat) => {
    setSelectedThreat(threat);
  };

  const handleCloseModal = () => {
    setSelectedThreat(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto h-screen mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Threat Alerts</h2>
        <div className="mb-4">
          <label htmlFor="sortOption" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="level">Level</option>
            <option value="name">Threat</option>
            <option value="occurrences">Number of Occurrences</option>
          </select>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Threat</th>
              <th className="border border-gray-300 p-2">
                Number of Occurrence
              </th>
              <th className="border border-gray-300 p-2">Level</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {threatAlerts.map((alert, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{alert.name}</td>
                <td className="border border-gray-300 p-2">
                  {alert.noOfOccurrence}
                </td>
                <td className="border border-gray-300 p-2">{alert.avgLevel}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleViewThreat(alert)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-white hover:text-green-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    View Threat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`cursor-pointer py-2 px-4 ${
                i + 1 === currentPage
                  ? "bg-blue-500 text-white font-semibold"
                  : "bg-white text-blue-500"
              } border border-blue-500 rounded-full`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedThreat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Threat Details - {selectedThreat.name}
            </h2>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">S/N</th>
                  <th className="border border-gray-300 p-2">Origin</th>
                  <th className="border border-gray-300 p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {selectedThreat.attacks.map((attack, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{attack.origin}</td>
                    <td className="border border-gray-300 p-2">{attack.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatAlerts;
