import React, { useState, useCallback } from 'react';
import { Header } from '../common/Header';
import { ImageCard } from '../common/ImageCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { useFetch } from '../../hooks/useFetch';
import nasaService from '../../services/nasaService';
import { ApodImageData } from '../../types/index';

export const SpaceViewer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [favorites, setFavorites] = useState<ApodImageData[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [dateValidationError, setDateValidationError] = useState<string>('');

  const { data, loading, error } = useFetch(
    () => nasaService.getApod(selectedDate),
    [selectedDate]
  );

  // Validate if date is not in the future
  const isFutureDate = (dateString: string): boolean => {
    const selectedDateTime = new Date(dateString).getTime();
    const todayTime = new Date().getTime();
    return selectedDateTime > todayTime;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    
    if (isFutureDate(newDate)) {
      setDateValidationError('Please select a past date. APOD data is only available up to today.');
      return;
    }
    
    setDateValidationError('');
    setSelectedDate(newDate);
  };

  const handleFavorite = useCallback((image: ApodImageData) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.date === image.date);
      if (exists) {
        return prev.filter((fav) => fav.date !== image.date);
      } else {
        return [...prev, { ...image, isFavorite: true, savedAt: new Date().toISOString() }];
      }
    });
  }, []);

  const handleRetry = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const isFavorited = data ? favorites.some((fav) => fav.date === data.date) : false;

  if (loading && !data) {
    return <LoadingSpinner message="Exploring the cosmos..." />;
  }

  if (error && !data) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        title="NASA Space Viewer"
        subtitle="Explore the Universe - Astronomy Picture of the Day"
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Controls Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-end justify-between mb-4">
            <div className="flex-1">
              <label className="block text-white font-semibold mb-2">
                Select a Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                max={new Date().toISOString().split('T')[0]}
              />
              <p className="text-gray-400 text-sm mt-1">
                Available from June 16, 1995 to today
              </p>
              
              {/* Date Validation Error Message */}
              {dateValidationError && (
                <div className="mt-3 p-3 bg-red-900 border border-red-700 rounded flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-200 text-sm">{dateValidationError}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-6 py-2 rounded font-semibold transition-colors duration-200 whitespace-nowrap ${
                showFavoritesOnly
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              ❤️ Favorites ({favorites.length})
            </button>
          </div>
        </div>

        {/* Image Display Section */}
        {showFavoritesOnly ? (
          <div>
            {favorites.length > 0 ? (
              <div className="grid gap-8 md:gap-12">
                {favorites.map((fav) => (
                  <div
                    key={fav.date}
                    className="flex justify-center"
                  >
                    <ImageCard
                      image={fav}
                      onFavorite={handleFavorite}
                      isFavorite={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No favorites yet. Start adding your favorite cosmic images!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            {data ? (
              <ImageCard
                image={data}
                onFavorite={handleFavorite}
                isFavorite={isFavorited}
              />
            ) : null}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && data && (
          <div className="text-center py-4">
            <p className="text-gray-400">Loading new image...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12 border-t border-gray-700">
        <p className="text-sm">
          Powered by NASA APOD API • Explore the cosmos one day at a time
        </p>
      </footer>
    </div>
  );
};
