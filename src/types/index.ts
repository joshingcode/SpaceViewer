/**
 * NASA APOD (Astronomy Picture of the Day) API Response
 */
export interface ApodImage {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

/**
 * Extended APOD data with local metadata
 */
export interface ApodImageData extends ApodImage {
  isFavorite?: boolean;
  savedAt?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
