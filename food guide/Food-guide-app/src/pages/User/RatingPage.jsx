import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRatings } from "../../firebase stuff/ratingService"; // Updated path to ratingService
import { useAuth } from "../../pages/components/AuthContext"; // Assuming you have an AuthContext for user data

export default function RatingsPage() {
  const { currentUser } = useAuth();
  const [ratedMeals, setRatedMeals] = useState([]);
  const [userRatings, setUserRatings] = useState({}); // Store user ratings fetched from Firestore
  const [sortOrder, setSortOrder] = useState("highest");

  useEffect(() => {
    if (currentUser) {
      const loadRatings = async () => {
        try {
          const ratings = await fetchRatings(currentUser.uid); // Fetch ratings from Firestore
          setUserRatings(ratings); // Store the fetched ratings in state
          
          const ratedMealIds = Object.keys(ratings || {});

          const fetchMeals = async () => {
            const promises = ratedMealIds.map((id) =>
              fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((response) => response.json())
                .then((data) => (data.meals ? data.meals[0] : null)) // Handle cases where meals might be undefined
            );

            const meals = (await Promise.all(promises)).filter((meal) => meal !== null); // Filter out null meals
            setRatedMeals(meals);
          };

          fetchMeals();
        } catch (error) {
          console.error("Error loading ratings:", error);
        }
      };

      loadRatings();
    }
  }, [currentUser]);

  // Sort meals by rating
  const sortedMeals = [...ratedMeals].sort((a, b) => {
    const ratingA = userRatings[a.idMeal]?.rating || 0;
    const ratingB = userRatings[b.idMeal]?.rating || 0;

    if (sortOrder === "highest") {
      return ratingB - ratingA;
    } else {
      return ratingA - ratingB;
    }
  });

  return (
    <div className="ratings-page min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Rated Meals</h1>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between">
        <button
          onClick={() => setSortOrder("highest")}
          className="w-full sm:w-auto text-yellow-400 bg-gray-800 border border-yellow-400 rounded-lg py-2 px-4 hover:bg-yellow-500 hover:text-gray-900 transition"
        >
          Sort by Highest Rating
        </button>
        <button
          onClick={() => setSortOrder("lowest")}
          className="w-full sm:w-auto text-yellow-400 bg-gray-800 border border-yellow-400 rounded-lg py-2 px-4 hover:bg-yellow-500 hover:text-gray-900 transition"
        >
          Sort by Lowest Rating
        </button>
      </div>

      {sortedMeals.length === 0 ? (
        <p className="text-gray-300">You have not rated any meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMeals.map((meal) => (
            <div key={meal.idMeal} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{meal.strMeal}</h2>
              <p className="text-lg text-gray-300">
                Rating: {userRatings[meal.idMeal]?.rating || 0} / 5 {/* Now using userRatings from Firestore */}
              </p>
              <Link
                to={`/meal/${meal.idMeal}`}
                className="text-yellow-400 underline hover:text-yellow-500"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}