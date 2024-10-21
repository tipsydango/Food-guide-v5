import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'; // Import the spinner component

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [randomMealImages, setRandomMealImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for programmatic routing

  // Function to fetch categories with a delay
  const fetchCategoriesWithTimeout = useCallback(() => {
    setLoading(true);
    setError(null);

    // Simulate a delay with setTimeout
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.categories);

        // Fetch random meal images for each category
        const fetchRandomMealImages = async () => {
          const categoryPromises = data.categories.map(async (category) => {
            try {
              const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
              if (!mealResponse.ok) {
                throw new Error(`Failed to fetch meals for ${category.strCategory}`);
              }
              const mealData = await mealResponse.json();
              const randomMeal = mealData.meals[Math.floor(Math.random() * mealData.meals.length)];
              return { category: category.strCategory, meal: randomMeal };
            } catch (error) {
              console.error(`Error fetching meals for ${category.strCategory}:`, error);
              return null;
            }
          });

          const results = await Promise.all(categoryPromises);
          const validResults = results.filter(result => result !== null);
          const images = validResults.reduce((acc, { category, meal }) => {
            acc[category] = meal;
            return acc;
          }, {});
          setRandomMealImages(images);
        };

        fetchRandomMealImages();
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    }, 1200); // Simulate a 300 ms delay

    return () => clearTimeout(timeoutId); // Cleanup if the component unmounts
  }, []);

  useEffect(() => {
    fetchCategoriesWithTimeout();
  }, [fetchCategoriesWithTimeout]);

  if (loading) return <LoadingSpinner />; // Use the spinner component for loading

  if (error) return <div className="text-white text-center">{error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Categories</h1>

      {/* Grid Layout for Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.idCategory} className="text-center">
            {/* Random Meal Image for the Specific Category */}
            {randomMealImages[category.strCategory] && (
              <img
                src={randomMealImages[category.strCategory].strMealThumb}
                alt={`${category.strCategory} meal`}
                className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300 hover:border hover:border-white hover:rounded-lg cursor-pointer"
                onClick={() => navigate(`/meal/${randomMealImages[category.strCategory].idMeal}`)} // Navigate to meal details
              />
            )}

            {/* Category Name with Underline on Hover */}
            <Link
              to={`/categories/${category.strCategory.toLowerCase()}`}
              className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 transition-colors hover:underline"
            >
              {category.strCategory}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}