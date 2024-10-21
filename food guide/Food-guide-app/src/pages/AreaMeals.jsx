import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AreaMeals() {
  const { areaName } = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => console.error(`Error fetching meals for area ${areaName}:`, error));
  }, [areaName]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Main content */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-center mb-8 capitalize text-white">{areaName} Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="text-center">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300 hover:border hover:border-white hover:rounded-lg cursor-pointer"
                onClick={() => navigate(`/meal/${meal.idMeal}`, { state: { from: "area", areaName } })}
              />
              <Link
                to={`/meal/${meal.idMeal}`}
                state={{ from: "area", areaName }}
                className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 transition-colors hover:underline"
              >
                {meal.strMeal}
              </Link>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
}