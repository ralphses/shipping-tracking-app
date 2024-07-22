// SafetyTips.js

import React from "react";
import { Link } from "react-router-dom";

const SafetyTips = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Safety Tips for Residents
        </h2>

        <p className="text-gray-700 mb-4">
          Welcome to the Gandu community in Lafia! Your safety is our priority.
          Here are some important safety tips:
        </p>

        <ul className="list-disc list-inside mb-6">
          <li className="text-gray-700">
            Always lock your doors and windows when leaving your residence.
          </li>
          <li className="text-gray-700">
            Be aware of your surroundings and report any suspicious activities.
          </li>
          <li className="text-gray-700">
            In case of emergencies, dial the appropriate emergency services.
          </li>
          <li className="text-gray-700">
            Register your lodge with us to receive important updates and enhance
            community safety.
          </li>
          <li className="text-gray-700">
            Obtain your unique USSD code for quick access to community services
            and assistance.
          </li>
        </ul>

        <p className="text-gray-700 mb-6">
          By registering your lodge and obtaining your USSD code, you contribute
          to creating a safer and more connected community.
        </p>

        <div className="flex justify-center">
          <Link to="/add-crime-scene">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700">
              Register Lodge & Obtain USSD Code
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
