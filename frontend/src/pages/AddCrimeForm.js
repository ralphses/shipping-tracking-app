import React, { useState } from "react";
import axios from "axios";

const AddCrimeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddCrime = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Send a request to add a new crime
      const response = await axios.post("http://localhost:8080/api/v1/crime", {
        name,
        description,
      });

      if (response.status === 201) {
        setSuccessMessage("Crime added successfully!");
        setErrorMessage(null);
        // Clear the form fields
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to add crime: ", error);
      setErrorMessage("Failed to add crime. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Add New Crime</h2>

        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter crime name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
              id="description"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter crime description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
            onClick={handleAddCrime}
          >
            Add Crime
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrimeForm;
