import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const activeStyles = {
  fontWeight: "bold",
  color: "#f59e0b", // Tailwind yellow-400
};

export default function UserLayout() {
  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white">
      <nav className="user-nav flex space-x-6 text-lg font-semibold mb-4">
        <NavLink
          to="favorites"
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Favorites
        </NavLink>
        <NavLink
          to="profile"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Profile
        </NavLink>
        <NavLink
          to="rating"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Ratings
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}