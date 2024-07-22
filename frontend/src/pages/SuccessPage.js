// SuccessPage.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  // Use useLocation hook to get the current location object
  const location = useLocation();
  const navigate = useNavigate();

  // Use URLSearchParams to get the parameters from the URL
  const params = new URLSearchParams(location.search);

  // Retrieve values from URL parameters
  const roomNumber = params.get("roomNumber");
  const lodgeName = params.get("lodgeName");
  const area = params.get("area");
  const ussdCode = params.get("ussdCode");

  // Handle the "OK" button click
  const handleOkClick = () => {
    // Redirect back to the home page ("/")
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Crime Scene Added Successfully!</h2>

        {/* Display crime scene data and USSD code */}
        <p>Room Number: {roomNumber}</p>
        <p>Lodge Name: {lodgeName}</p>
        <p>Area: {area}</p>
        <p>USSD Code: {ussdCode}</p>
        <p><strong>Please keep your USSD Code safe as it will be used for crime reporting</strong></p>

        {/* "OK" button to navigate back to the home page */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 mt-4"
          onClick={handleOkClick}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
