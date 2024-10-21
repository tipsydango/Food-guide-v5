import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Fetch a random meal image from TheMealDB API
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals[0];
        setBackgroundImage(meal.strMealThumb); // Set the meal image as the background
      })
      .catch((error) => console.error("Error fetching background image:", error));
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white  ">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Background Overlay for Opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Layer */}
      <div className="relative bg-black bg-opacity-50 z-10 p-8 text-center rounded-lg">
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-4 font-serif">Stuck on what to cook well look no further!</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto font-serif">
            Add to your list of cooking recipes with our <span className="border-b-2 font-thin text-yellow-400 px-2 py-1 rounded-lg shadow-lg" style={{ fontFamily: 'Chewy, sans-serif' }}>Foodies' Guide.</span> Make a perfect dish today
          </p>
        </section>

        {/* Call to Action Link (Styled as a Button) */}
        <section>
          <Link
            to="/categories"
            className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-3 px-6 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300"
          >
            Find  new recipes here !
          </Link>
        </section>
      </div>
    </div>
  );
}