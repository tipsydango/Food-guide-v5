import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to the Meal Finder application! We are dedicated to helping you find and explore meals from around the world. Our app provides a comprehensive database of meals categorized by region, type, and more.
        </p>
        <p className="text-lg mb-4">
          Whether you are looking for a new recipe to try or exploring different cuisines, we have a wide selection of meals with detailed information on ingredients, instructions, and more.
        </p>
        <p className="text-lg mb-4">
          Feel free to navigate through the categories, search for specific meals, and dive into detailed recipes. We hope you enjoy discovering new and exciting dishes!
        </p>
        <p className="text-lg mb-4">
          If you have any questions or feedback, please don't hesitate to reach out to us. Thank you for using Meal Finder!
        </p>
        <div className="text-center">
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}