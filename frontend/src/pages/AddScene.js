import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCrimeSceneForm = () => {
  const navigate = useNavigate();

  // State variables
  const [roomNumber, setRoomNumber] = useState("");
  const [lodgeName, setLodgeName] = useState("");
  const [area, setArea] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ussdCode, setUssdCode] = useState("");
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!roomNumber.trim()) {
      newErrors.roomNumber = "Room Number is required";
    }

    if (!lodgeName.trim()) {
      newErrors.lodgeName = "Lodge Name is required";
    }

    if (!area.trim()) {
      newErrors.area = "Area is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle adding a crime scene
  const handleAddCrimeScene = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Send a request to add a new crime scene
      const response = await axios.post("http://localhost:8080/api/v1/crime-scene", {
        roomNumber,
        lodgeName,
        area,
      });

      if (response.status === 201) {
        setSuccessMessage("Crime scene added successfully!");
        setErrorMessage(null);

        // Set the USSD code received from the server
        setUssdCode(response.data.data.code);

        // Redirect to success page with crime scene data and USSD code
        navigate(`/success?roomNumber=${roomNumber}&lodgeName=${lodgeName}&area=${area}&ussdCode=${response.data.data.code}`);

        // Clear the form fields
        setRoomNumber("");
        setLodgeName("");
        setArea("");
      }
    } catch (error) {
      console.error("Failed to add crime scene: ", error);
      setErrorMessage("Failed to add crime scene. Please try again.");
      setSuccessMessage(null);
    }
  };

  // JSX structure
  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Add New Crime Scene</h2>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form>
          <div className="mb-4">
            <label htmlFor="roomNumber" className="block text-gray-700 font-semibold mb-2">Room Number:</label>
            <input
              type="text"
              id="roomNumber"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 ${errors.roomNumber ? 'border-red-500' : ''}`}
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            {errors.roomNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lodgeName" className="block text-gray-700 font-semibold mb-2">Lodge Name:</label>
            <input
              type="text"
              id="lodgeName"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 ${errors.lodgeName ? 'border-red-500' : ''}`}
              placeholder="Enter lodge name"
              value={lodgeName}
              onChange={(e) => setLodgeName(e.target.value)}
            />
            {errors.lodgeName && (
              <p className="text-red-500 text-sm mt-1">{errors.lodgeName}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="area" className="block text-gray-700 font-semibold mb-2">Area:</label>
            <input
              type="text"
              id="area"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 ${errors.area ? 'border-red-500' : ''}`}
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            {errors.area && (
              <p className="text-red-500 text-sm mt-1">{errors.area}</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
            onClick={handleAddCrimeScene}
          >
            Add Crime Scene
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrimeSceneForm;
