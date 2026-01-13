import React from 'react';
import { ApodImageData } from '../../types/index';

interface ImageCardProps {
  image: ApodImageData;
  onFavorite?: (image: ApodImageData) => void;
  isFavorite?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onFavorite,
  isFavorite = false,
}) => {
  const handleFavoriteClick = () => {
    if (onFavorite) {
      onFavorite(image);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-2xl w-full">
      {/* Image Container */}
      <div className="relative w-full h-96 bg-black overflow-hidden group">
        {image.media_type === 'image' ? (
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={image.url}
            title={image.title}
            className="border-0"
            allowFullScreen
          />
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-200 z-10"
          aria-label="Add to favorites"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 text-white">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 line-clamp-2">{image.title}</h2>

        {/* Date and Copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-400 mb-4">
          <span className="font-semibold">{image.date}</span>
          {image.copyright && <span className="text-gray-500">© {image.copyright}</span>}
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed line-clamp-4 mb-4">
          {image.explanation}
        </p>

        {/* HD Image Link */}
        {image.hdurl && image.media_type === 'image' && (
          <a
            href={image.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            View HD Image
          </a>
        )}
      </div>
    </div>
  );
};
