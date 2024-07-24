import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

export default function HomePage() {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex items-center justify-center">
        <div className="text-center text-blue-900 p-10 rounded-lg shadow-xl bg-white bg-opacity-80">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-down">
            Shipping Order Tracking System
          </h1>
          <p className="text-lg mb-8 animate-fade-in">
            Efficiently manage and track your shipping orders with ease, powered by Algorand blockchain technology.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110">
              Create Account
            </Link>
            <Link to="/orders" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110">
              View Orders
            </Link>
            <Link to="/orders/track" className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110">
              Track an Order
            </Link>
          </div>
        </div>
      </div>
  );
}
