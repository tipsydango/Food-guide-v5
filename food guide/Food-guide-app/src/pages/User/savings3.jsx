import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

export default function MealDetails() {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          navigate("/not-found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error);
        navigate("/not-found");
        setLoading(false);
      });
  }, [idMeal, navigate]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isMealFavorite = favorites.some((item) => item.idMeal === idMeal);
    setIsFavorite(isMealFavorite);

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRating(savedRatings[idMeal] || 0);
  }, [idMeal]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.idMeal !== idMeal);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(meal);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleRating = () => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    savedRatings[idMeal] = { rating }; // Save rating for the meal
    localStorage.setItem("ratings", JSON.stringify(savedRatings));

    // Navigate to the RatingPage with the meal data and rating
    navigate('/user/rating', { state: { meal, rating } });
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;

  if (!meal) return <div className="text-white text-center">No meal data available.</div>;

  const cameFromArea = location.state?.from === "area";
  const cameFromCategory = location.state?.from === "category";
  const categoryName = location.state?.categoryName;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white">
      <Link
        to={cameFromArea ? `/area/${meal.strArea.toLowerCase()}` : cameFromCategory ? `/categories/${categoryName}` : "/categories"}
        className="text-yellow-400 underline hover:text-yellow-500 transition-colors"
      >
        &larr; Back to {cameFromArea ? meal.strArea : cameFromCategory ? categoryName : "Categories"}
      </Link>

      <div className="mt-8">
        <div className="meal-detail">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-80 object-cover rounded-lg mb-6" />
          <div className="meal-detail-info">
            <h1 className="text-3xl font-bold text-yellow-400 opacity-90 underline mb-4">{meal.strMeal}</h1>
            <button
              onClick={handleFavoriteToggle}
              className={`py-2 px-4 rounded-lg text-white ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-400 hover:bg-yellow-500'}`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">Rating:</h2>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={handleRating}
                className="mt-4 py-2 px-4 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>

        <nav className="meal-detail-nav flex space-x-6 text-lg font-semibold mb-4 mt-4">
          <button
            onClick={() => setActiveSection("details")}
            className={`${activeSection === "details" ? "underline text-yellow-400" : "hover:text-yellow-500 "}`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveSection("instructions")}
            className={`${activeSection === "instructions" ? "underline text-yellow-400" : "hover:text-yellow-500"}`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveSection("ingredients")}
            className={`${activeSection === "ingredients" ? "underline text-yellow-400" : "hover:text-yellow-500"}`}
          >
            Ingredients
          </button>
        </nav>

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
                    <div key={index} className="flex flex-col p-2 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <span className="text-yellow-400">{ingredient}</span>
                      <span className="text-gray-300">{measure}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}