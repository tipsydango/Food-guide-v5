import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFavorites } from "../../firebase stuff/favoritesService"; // Ensure this matches your folder structure
import { fetchRatings } from "../../firebase stuff/ratingService"; // Import fetchRatings
import { useAuth } from "../components/AuthContext"; // Assuming you have AuthContext for user authentication

export default function Favorites() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const loadFavoritesAndRatings = async () => {
      if (currentUser) {
        try {
          // Fetch both favorites and ratings
          const [fetchedFavorites, fetchedRatings] = await Promise.all([
            fetchFavorites(currentUser.uid),
            fetchRatings(currentUser.uid),
          ]);

          setFavorites(Object.values(fetchedFavorites)); // Convert object to array for easier rendering
          setRatings(fetchedRatings);
        } catch (error) {
          console.error("Error fetching favorites or ratings:", error);
        }
      }
    };

    loadFavoritesAndRatings();
  }, [currentUser]);

  return (
    <div className="favorites-page min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-300">You have no favorite meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{meal.strMeal}</h2>
              <p className="text-lg text-gray-300">
                Rating: {ratings[meal.idMeal]?.rating || 'Not Rated'} / 5
              </p>
              <Link to={`/meal/${meal.idMeal}`} className="text-yellow-400 underline hover:text-yellow-500">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}