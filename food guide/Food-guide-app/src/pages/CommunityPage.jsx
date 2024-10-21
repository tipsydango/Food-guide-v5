import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CategoryMeals() {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch meals for the selected category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setMeals(data.meals);
        } else {
          // If no meals are found, navigate to the NotFound page
          navigate("/not-found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching meals for ${categoryName}:`, error);
        // Navigate to the NotFound page in case of an error
        navigate("/not-found");
        setLoading(false);
      });
  }, [categoryName, navigate]);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  if (!meals || meals.length === 0) return <div className="text-white">No meals available.</div>;

  // Capitalize the first letter of the category name
  const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="container mx-auto p-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">{formattedCategoryName} Meals</h1>

        {/* Grid Layout for Meals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="text-center">
              {/* Meal Image */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300 hover:border hover:border-white hover:rounded-lg cursor-pointer"
                onClick={() => navigate(`/meal/${meal.idMeal}`, { state: { from: "category", categoryName } })} // Pass category info
              />

              {/* Meal Name */}
              <Link
                to={`/meal/${meal.idMeal}`}
                state={{ from: "category", categoryName }} // Pass category info in state
                className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 transition-colors hover:underline"
              >
                {meal.strMeal}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 text-center py-4 mt-auto">
        © 2024 Foodies' Guide. All rights reserved.
      </footer>
    </div>
  );
}