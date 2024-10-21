  import React from 'react';

  const MealNavigation = ({ activeSection, setActiveSection }) => {
    return (
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
    );
  };

  export default MealNavigation;