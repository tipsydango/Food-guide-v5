import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase'; // Adjust the path if needed
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Sign Up Successful');
      setError('');
      // Optionally, redirect to the sign-in page or another page
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-lg mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">Already have an account? <Link to="/sign-in" className="text-yellow-400 underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;