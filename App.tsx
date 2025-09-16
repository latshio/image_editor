
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ActionPanel } from './components/ActionPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { editImageWithAi } from './services/geminiService';
import { EffectType } from './types';
import { fileToBase64 } from './utils/imageUtils';

export default function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setEditedImage(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEffectRequest = useCallback(async (effect: EffectType) => {
    if (!originalImageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setEditedImage(null);
    setError(null);
    setLoadingMessage(`Applying ${effect} effect...`);

    try {
      const { base64, mimeType } = await fileToBase64(originalImageFile);
      const prompt = effect === 'cartoonize' 
        ? 'Cartoonize this image. Make the lines bold and the colors vibrant, like a classic animated comic.'
        : 'Posterize this image. Reduce the number of colors to create a bold, graphic, poster-like effect with sharp contrasts.';
      
      const resultBase64 = await editImageWithAi(base64, mimeType, prompt);

      if (resultBase64) {
        setEditedImage(`data:image/png;base64,${resultBase64}`);
      } else {
        throw new Error('The AI did not return an image. Please try again.');
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImageFile]);
  
  const handleReset = () => {
    setOriginalImageFile(null);
    setOriginalImagePreview(null);
    setEditedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 flex-grow">
        {!originalImagePreview && <ImageUploader onImageUpload={handleImageUpload} />}
        
        {originalImagePreview && (
          <>
            <ActionPanel onEffectRequest={handleEffectRequest} onReset={handleReset} isLoading={isLoading} />
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-400 mb-4">Original</h2>
                <img src={originalImagePreview} alt="Original user upload" className="rounded-xl shadow-lg w-full max-w-md object-contain" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-400 mb-4">AI Enhanced</h2>
                <div className="w-full max-w-md aspect-square bg-gray-800/50 rounded-xl shadow-lg flex items-center justify-center border-2 border-dashed border-gray-700">
                  {isLoading && <Loader message={loadingMessage} />}
                  {!isLoading && !editedImage && <div className="text-gray-500">Your edited image will appear here</div>}
                  {editedImage && <img src={editedImage} alt="AI edited result" className="rounded-xl w-full object-contain" />}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        <p>Powered by Gemini. This is a web application and cannot be compiled into an APK.</p>
      </footer>
    </div>
  );
}
