import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from './pages/Categories';
import MealDetails from './pages/MealDetails';
import CategoryMeals from './pages/CategoryMeals';
import AreaMeals from './pages/AreaMeals';
import NotFound from './pages/NotFound';
import logo from "./assets/foodlogo.png"; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserLayout from "./pages/User/UserLayout";
import Favorites from "./pages/User/Favorites";
import RatingsPage from "./pages/User/RatingPage";
import IngredientsPage from "./pages/IngredientsPage";
import AuthRequired from "../src/pages/components/AuthRequired";
import Profile from './pages/User/Profile';
import { AuthProvider } from './pages/components/AuthContext';
import Footer from "./pages/Footer";
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the menu after a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Store the last valid path in local storage
    localStorage.setItem("lastValidPath", location.pathname);
  }, [location]);

  return (
    <>
      <header className="relative z-50 bg-black px-4 py-4 flex justify-between items-center mb-0">
        <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
          <img src={logo} alt="Foodies' Guide Logo" className="h-16 w-auto" />
          <span className="text-xl font-bold text-yellow-400 tracking-widest" style={{ fontFamily: 'Chewy, sans-serif' }}>
            Foodies' Guide
          </span>
        </Link>

        {/* Mobile navigation button */}
        <div className="block lg:hidden mt-0">
          <button id="menu-toggle" className="text-yellow-400 focus:outline-none" onClick={toggleMobileMenu}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Navigation links for large screens */}
        <nav className="hidden lg:flex space-x-4 mt-0">
          <Link to="/about" className="text-yellow-400 hover:text-white">About</Link>
          <Link to="/categories" className="text-yellow-400 hover:text-white">Categories</Link>
          <Link to="/sign-in" className="text-yellow-400 hover:text-white">Log in</Link>
          <Link to="/user" className="text-yellow-400 hover:text-white">User</Link>
        </nav>

        {/* Mobile menu (shown when the button is clicked) */}
        {isMobileMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-black z-40 space-y-2 py-4 shadow-lg lg:hidden mt-0">
            <Link to="/about" className="block text-yellow-400 py-2 px-4 hover:bg-gray-800" onClick={closeMobileMenu}>About</Link>
            <Link to="/categories" className="block text-yellow-400 py-2 px-4 hover:bg-gray-800" onClick={closeMobileMenu}>Categories</Link>
            <Link to="/sign-in" className="block text-yellow-400 py-2 px-4 hover:bg-gray-800" onClick={closeMobileMenu}>Log in</Link>
            <Link to="/user" className="block text-yellow-400 py-2 px-4 hover:bg-gray-800" onClick={closeMobileMenu}>User</Link>
          </nav>
        )}
      </header>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryName" element={<CategoryMeals />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
        <Route path="/area/:areaName" element={<AreaMeals />} />
        <Route path="/ingredients/:ingredient" element={<IngredientsPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Routes that require authentication */}
        <Route element={<AuthRequired />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="rating" element={<RatingsPage />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);