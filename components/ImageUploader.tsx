
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if(file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  }, [onImageUpload, handleDragEvents]);

  return (
    <div className="w-full max-w-2xl mx-auto flex justify-center items-center p-4">
      <label
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ease-in-out
          ${isDragging ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <div className={`p-4 rounded-full transition-colors duration-300 ${isDragging ? 'bg-indigo-600/30' : 'bg-gray-700/50'}`}>
                <UploadIcon className={`w-10 h-10 transition-colors duration-300 ${isDragging ? 'text-indigo-400' : 'text-gray-500'}`} />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-300">
                <span className="font-bold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF, WEBP</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
};
