import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from '../assets/components/LoadingSpinner';

export default function IngredientsPage() {
  const { ingredient } = useParams(); // Get the ingredient from the URL
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  }, [ingredient]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">
        Meals with {decodeURIComponent(ingredient)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="text-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => window.location.href = `/meal/${meal.idMeal}`}
            />
            <h2 className="text-xl font-semibold text-yellow-400">{meal.strMeal}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}