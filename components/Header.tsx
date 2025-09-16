
import React from 'react';
import { MagicWandIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 w-full max-w-4xl mx-auto">
       <div className="flex items-center justify-center gap-4 mb-4">
        <div className="p-3 bg-indigo-600/20 rounded-full border border-indigo-500/30">
          <MagicWandIcon className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          Image Effects AI
        </h1>
      </div>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Upload any picture and let Gemini's "Nano Banana" model transform it. Choose an effect to get started.
      </p>
    </header>
  );
};
