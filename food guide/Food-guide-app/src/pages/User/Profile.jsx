import React from 'react';
import { useAuth } from '../../pages/components/AuthContext'; // Adjust path if necessary
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase'; // Adjust path if needed

export default function Profile() {
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="profile-page min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Your Profile</h1>
      {currentUser ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-xl text-gray-300 mb-4">Email: {currentUser.email}</p>
          <button
            onClick={handleSignOut}
            className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-gray-300">No user information available.</p>
      )}
    </div>
  );
}