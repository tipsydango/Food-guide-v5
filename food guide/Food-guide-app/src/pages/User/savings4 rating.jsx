import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RatingsPage() {
  const [ratedMeals, setRatedMeals] = useState([]);

  useEffect(() => {
    // Retrieve ratings from local storage
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    
    // Filter out the rated meals
    const ratedMealIds = Object.keys(storedRatings);
    
    // Fetch meal details for each rated meal
    const fetchRatedMeals = async () => {
      const promises = ratedMealIds.map(id =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(response => response.json())
          .then(data => data.meals[0])
      );
      
      const meals = await Promise.all(promises);
      setRatedMeals(meals);
    };
    
    fetchRatedMeals();
  }, []);

  return (
    <div className="ratings-page min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Rated Meals</h1>
      {ratedMeals.length === 0 ? (
        <p className="text-gray-300">You have not rated any meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratedMeals.map((meal) => (
            <div key={meal.idMeal} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{meal.strMeal}</h2>
              <p className="text-lg text-gray-300">
                Rating: {JSON.parse(localStorage.getItem("ratings"))[meal.idMeal].rating} / 5
              </p>
              <Link to={`/meal/${meal.idMeal}`} className="text-yellow-400 underline hover:text-yellow-500">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}