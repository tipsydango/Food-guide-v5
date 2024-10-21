import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const lastValidPath = localStorage.getItem("lastValidPath") || "/"; // Get the last valid path from localStorage
    if (lastValidPath !== window.location.pathname) { // Prevent redirecting to the same page (loop issue)
      navigate(lastValidPath); // Navigate to the last valid path
    } else {
      navigate("/"); // Fallback to home if no valid path
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>

     

        {/* Go back to the Home page */}
        <Link
          to="/"
          className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-3 px-6 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
   
  );
}