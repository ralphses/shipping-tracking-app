import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-300 min-h-screen flex items-center justify-center">
      <div className="text-center text-green-800">
        <h1 className="text-5xl font-extrabold mb-4">
          Nasarawa State Government House Network Security Division
        </h1>
        <p className="text-lg mb-8">
          Safeguarding the network infrastructure through advanced threat detection and response.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/report-incident" className="bg-red-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-50 hover:text-red-800 transition duration-300">
            Report a Security Incident
          </Link>
          <Link to="/security-tips" className="text-sm font-semibold leading-6 text-white">
            Security Tips <span className="ml-1">&#8594;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
