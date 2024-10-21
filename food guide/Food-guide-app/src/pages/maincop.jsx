import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import RatingsPage from "./pages/User/RatingPage"
import IngredientsPage from "./pages/IngredientsPage"
import AuthRequired from "../src/pages/components/AuthRequired"
import Profile from './pages/User/Profile';
import { AuthProvider } from './pages/components/AuthContext'
import CommunityPage  from './pages/CommunityPage';


import './index.css';


function App() {
  return (
    <BrowserRouter>
      <header className="h-[110px] flex justify-between items-center py-[10px] bg-black px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Foodies' Guide Logo" className="h-20 mr-2 border-0 border-white" />
          <span className="text-2xl font-bold text-yellow-400 tracking-widest" style={{ fontFamily: 'Chewy, sans-serif' }}>
            Foodies' Guide
          </span>
        </Link>
        <nav>
          <Link to="/about" className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-1 px-2 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300">
            About
          </Link>
          <Link to="/categories" className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-1 px-2 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300 ml-10">
            Categories
          </Link>
          <Link to="/sign-in" className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-1 px-2 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300">
            Log in
          </Link>
          <Link to="/user" className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-1 px-2 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300">
            User
          </Link>
          <Link to="/Communityratings" className="text-yellow-400 bg-black border-l-2 border-b-2 border-white rounded-lg py-1 px-2 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition duration-300">
          Community Ratings
          </Link>
        </nav>
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
        <Route  path="/Communityratings" element={<CommunityPage />}></Route>
        
        {/* Routes that require authentication */}
        <Route element={<AuthRequired />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Favorites />} />
             <Route path='profile' element={<Profile/>}/>
            <Route path="favorites" element={<Favorites />} />
            <Route path="rating" element={<RatingsPage />} />
            {/* Add more routes as needed */}
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
} 

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);