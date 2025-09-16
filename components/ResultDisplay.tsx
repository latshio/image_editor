
import React from 'react';
import { Loader } from './Loader';

interface ResultDisplayProps {
  editedImage: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ editedImage, isLoading, loadingMessage }) => {
  return (
    <div className="w-full max-w-md aspect-square bg-gray-800/50 rounded-xl shadow-lg flex items-center justify-center border-2 border-dashed border-gray-700">
      {isLoading && <Loader message={loadingMessage} />}
      {!isLoading && !editedImage && <div className="text-gray-500">Your edited image will appear here</div>}
      {editedImage && <img src={editedImage} alt="AI edited result" className="rounded-xl w-full h-full object-contain" />}
    </div>
  );
};
