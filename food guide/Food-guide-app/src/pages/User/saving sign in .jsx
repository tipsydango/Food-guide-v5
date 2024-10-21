import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign In Successful'); // Log to verify sign-in success
      setSuccess('Sign In Successful');
      setError('');
      navigate('/user'); // Ensure this is inside the try block
    } catch (error) {
      console.error('Sign In Error:', error.message); // Log error if sign-in fails
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
        <p className="text-center mb-4">You must log in to use these features.</p>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-4">
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 transition-colors"
          >
            Log in
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">Don't have an account? <Link to="/sign-up" className="text-yellow-400 underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;