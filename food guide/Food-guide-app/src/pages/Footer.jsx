import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto text-center">
        {/* Social media links */}
        <div className="mb-4 flex justify-center space-x-6">
          <a href="https://facebook.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12v-9.294H9.294V11.06H12V8.708c0-2.645 1.623-4.092 3.991-4.092 1.136 0 2.113.085 2.398.122v2.773h-1.648c-1.294 0-1.546.615-1.546 1.519v1.937h3.1l-.403 3.646h-2.697V24h5.301c.725 0 1.325-.6 1.325-1.324V1.325C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.557a9.863 9.863 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.865 9.865 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.945 13.945 0 01-10.125-5.142 4.92 4.92 0 001.523 6.573 4.898 4.898 0 01-2.228-.615v.061a4.92 4.92 0 003.946 4.827 4.93 4.93 0 01-2.224.084 4.926 4.926 0 004.6 3.419A9.868 9.868 0 010 21.539 13.934 13.934 0 007.548 24c9.142 0 14.307-7.72 13.995-14.646A9.936 9.936 0 0024 4.557z" />
            </svg>
          </a>
        </div>

        {/* Footer Links */}
        <div className="mb-4">
          <Link to="/" className="text-yellow-400 hover:text-white mx-4">Home</Link>
          <Link to="/about" className="text-yellow-400 hover:text-white mx-4">About</Link>
          <Link to="/categories" className="text-yellow-400 hover:text-white mx-4">Categories</Link>
          
        </div>

        {/* Footer copyright text */}
        <div className="text-sm text-gray-500">
          &copy; 2024 Foodies' Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}