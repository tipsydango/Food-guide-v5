import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'; // Import the spinner component

export default function IngredientsPage() {
  const { ingredient } = useParams(); // Get the ingredient from the URL
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch meals with a delay
  const fetchMealsWithTimeout = useCallback(() => {
    setLoading(true);
    setError(null);

    // Simulate a delay with setTimeout
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError("Error fetching meals.");
      } finally {
        setLoading(false);
      }
    }, 0); // Simulate a 0 ms delay for immediate response

    return () => clearTimeout(timeoutId); // Cleanup if the component unmounts
  }, [ingredient]);

  useEffect(() => {
    fetchMealsWithTimeout();
  }, [fetchMealsWithTimeout]);

  if (loading) return <LoadingSpinner />; // Use the spinner component for loading

  if (error) return <div className="text-white text-center">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Main content */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Meals with {decodeURIComponent(ingredient)}
        </h1>

        {/* Grid Layout for Meals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.idMeal} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <Link to={`/meal/${meal.idMeal}`} state={{ from: "ingredient", ingredientName: ingredient }}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300"
                  />
                  <h2 className="text-xl font-semibold underline text-yellow-400 cursor-pointer">{meal.strMeal}</h2>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-yellow-400">No meals found with this ingredient.</p>
          )}
        </div>
      </div>

     
     
    </div>
  );
}