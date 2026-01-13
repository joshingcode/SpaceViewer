import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-red-900 border-2 border-red-700 rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 text-red-400 mx-auto mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-200 mb-2">Oops!</h2>
        <p className="text-red-100 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
