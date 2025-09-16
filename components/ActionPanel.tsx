
import React from 'react';
import { EffectType } from '../types';
import { PaintBrushIcon, PhotoIcon, ArrowPathIcon } from './icons';

interface ActionPanelProps {
  onEffectRequest: (effect: EffectType) => void;
  onReset: () => void;
  isLoading: boolean;
}

const ActionButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  Icon: React.ElementType;
  text: string;
}> = ({ onClick, disabled, Icon, text }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 active:scale-95"
  >
    <Icon className="w-6 h-6" />
    <span>{text}</span>
  </button>
);

export const ActionPanel: React.FC<ActionPanelProps> = ({ onEffectRequest, onReset, isLoading }) => {
  return (
    <div className="w-full max-w-2xl bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-grow w-full flex gap-4">
        <ActionButton 
          onClick={() => onEffectRequest('cartoonize')}
          disabled={isLoading}
          Icon={PaintBrushIcon}
          text="Cartoonize"
        />
        <ActionButton 
          onClick={() => onEffectRequest('posterize')}
          disabled={isLoading}
          Icon={PhotoIcon}
          text="Posterize"
        />
      </div>
      <button 
        onClick={onReset}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors duration-300 bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <ArrowPathIcon className="w-5 h-5" />
        Start Over
      </button>
    </div>
  );
};
