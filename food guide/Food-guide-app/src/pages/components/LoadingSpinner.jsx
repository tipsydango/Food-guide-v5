import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen  bg-gray-900">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" role="status">
        
      </div>
    </div>
  );
}