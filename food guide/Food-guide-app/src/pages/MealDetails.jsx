import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner';
import MealContent from "./components/MealContent";
import MealHeader from "./components/MealHeader";
import MealNavigation from "./components/MealNavigation";
import  { uploadFavorite, fetchFavorites} from "../firebase stuff/favoritesService"
import { useAuth } from "../pages/components/AuthContext";


import { uploadRating, fetchRatings } from "../firebase stuff/ratingService"; // Ensure this matches your folder structure

export default function MealDetails() {
  const { idMeal } = useParams();
  const { currentUser } = useAuth();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMealWithTimeout = useCallback((id) => {
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  useEffect(() => {
    if (idMeal) {
      fetchMealWithTimeout(idMeal);
    }
  }, [idMeal, fetchMealWithTimeout]);

  useEffect(() => {
    if (idMeal && currentUser) {
      const loadRatingsAndFavorites = async () => {
        try {
          const ratings = await fetchRatings(currentUser.uid);
          const favorites = await fetchFavorites(currentUser.uid); // Fetch favorites from Firestore
          setRating(ratings[idMeal]?.rating || 0);

          const isMealFavorite = favorites[idMeal] ? true : false;
          setIsFavorite(isMealFavorite);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      loadRatingsAndFavorites();
    }
  }, [idMeal, currentUser]);

  const handleFavoriteToggle = async () => {
    if (currentUser) {
      try {
        const favorites = await fetchFavorites(currentUser.uid);
  
        if (isFavorite) {
          // Remove the meal from favorites
          delete favorites[idMeal]; // Remove meal locally
          console.log("Favorites after deletion:", favorites); // Debugging: check the favorites after deletion
          await uploadFavorite(currentUser.uid, favorites); // Update Firestore
        } else {
          // Add the meal to favorites
          favorites[idMeal] = meal;
          await uploadFavorite(currentUser.uid, favorites); // Update Firestore
        }
  
        setIsFavorite(!isFavorite); // Update UI
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    }
  };
  
  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    if (currentUser) {
      try {
        await uploadRating(currentUser.uid, idMeal, newRating);
      } catch (error) {
        console.error("Error uploading rating:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!meal) return <div className="text-white text-center">No meal data available.</div>;

  const cameFromArea = location.state?.from === "area";
  const cameFromCategory = location.state?.from === "category";
  const cameFromIngredient = location.state?.from === "ingredient";
  const categoryName = location.state?.categoryName;
  const ingredientName = location.state?.ingredientName;

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white">
      {cameFromIngredient && (
        <Link
          to={`/ingredients/${encodeURIComponent(ingredientName)}`}
          className="text-yellow-400 underline hover:text-yellow-500 transition-colors mb-2"
        >
          &larr; Back to Ingredients
        </Link>
      )}
      {cameFromArea && !cameFromIngredient && (
        <Link
          to={`/area/${meal.strArea.toLowerCase()}`}
          className="text-yellow-400 underline hover:text-yellow-500 transition-colors  mb-2"
        >
          &larr; Back to {meal.strArea}
        </Link>
      )}
      {cameFromCategory && !cameFromIngredient && (
        <Link
          to={`/categories/${categoryName.toLowerCase()}`}
          className="text-yellow-400 underline hover:text-yellow-500 transition-colors  mb-2"
        >
          &larr; Back to {categoryName}
        </Link>
      )}
      {!cameFromArea && !cameFromCategory && !cameFromIngredient && (
        <Link
          to="/categories"
          className="text-yellow-400 underline hover:text-yellow-500 transition-colors"
        >
          &larr; Back to Categories
        </Link>
      )}

      <MealHeader
        meal={meal}
        isFavorite={isFavorite}
        handleFavoriteToggle={handleFavoriteToggle}
        rating={rating}
        handleRatingChange={handleRatingChange}
      />
      <MealNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MealContent
        activeSection={activeSection}
        meal={meal}
        rating={rating}  // Pass rating to MealContent
      />
    </div>
  );
}