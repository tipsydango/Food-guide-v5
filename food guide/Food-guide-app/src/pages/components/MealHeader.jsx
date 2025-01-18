import React from 'react';
import { Link } from 'react-router-dom';

const MealHeader = ({ meal, isFavorite, handleFavoriteToggle, rating, handleRatingChange }) => {
  return (
    <div className="meal-detail">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-96 object-cover rounded-lg mb-6 mt-2" />
      <div className="meal-detail-info">
        <h1 className="text-3xl font-bold text-yellow-400 opacity-90 underline mb-4">{meal.strMeal}</h1>
        
        <button
          onClick={handleFavoriteToggle}
          className={`py-2 px-4 rounded-lg text-white ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-400 hover:bg-yellow-500'}`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>

        <Link
          to="/user/favorites"
          className="ml-4 text-sm text-yellow-400 underline hover:text-yellow-500"
        >
          Go to Favorites
        </Link>
        
        <div className="mt-4">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">Rating:</h2>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealHeader;