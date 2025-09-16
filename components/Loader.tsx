
import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-gray-300">{message}</p>
      <p className="text-sm text-gray-500">This can take a moment...</p>
    </div>
  );
};
