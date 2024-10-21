import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase'; // Adjust path if needed

const AuthRequired = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user); // Log user object to verify
      setIsAuthenticated(!!user);
    }, (error) => {
      console.error("Auth state change error:", error);
      setIsAuthenticated(false); // Or handle the error differently
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Consider adding a spinner or loading indicator
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default AuthRequired;