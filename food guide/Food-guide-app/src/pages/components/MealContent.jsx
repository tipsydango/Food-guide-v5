import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MealContent = ({ activeSection, meal, rating }) => {
  const navigate = useNavigate();

  return (
    <div className="meal-details-content mt-6">
      {activeSection === "details" && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-yellow-400">Details</h2>
          <p>Name: {meal.strMeal}</p>
          <p>
            Category:{" "}
            <Link
              to={`/categories/${meal.strCategory.toLowerCase()}`}
              className="text-yellow-400 underline hover:text-yellow-500"
            >
              {meal.strCategory}
            </Link>
          </p>
          <p>
            Area:{" "}
            <span
              className="text-yellow-400 underline cursor-pointer hover:text-yellow-500"
              onClick={() => navigate(`/area/${meal.strArea.toLowerCase()}`, { state: { from: "area" } })}
            >
              {meal.strArea}
            </span>
          </p>
          <p>Rating: {rating} / 5</p>
        </div>
      )}

      {activeSection === "instructions" && (
        <div>
          <h2 className="text-xl text-yellow-400 font-bold mb-2">Instructions</h2>
          <p className="bg-gray-800 rounded-xl p-4">{meal.strInstructions}</p>
        </div>
      )}

      {activeSection === "ingredients" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Ingredients</h2>
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = meal[`strIngredient${index + 1}`];
              const measure = meal[`strMeasure${index + 1}`];
              return ingredient ? (
                <Link
                  key={index}
                  to={`/ingredients/${encodeURIComponent(ingredient)}`}
                  className="block p-2 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <span className="text-yellow-400 underline">{ingredient}</span>
                  <span className="text-gray-300">{measure}</span>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealContent;