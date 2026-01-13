import config from '../config/config';
import { ApodImage, ApiResponse } from '../types/index';

class NasaService {
  private baseUrl = config.nasaApiBaseUrl;
  private apiKey = config.nasaApiKey;

  /**
   * Fetch Astronomy Picture of the Day (APOD)
   * @param date - Optional specific date (YYYY-MM-DD format)
   * @returns Promise with APOD data
   */
  async getApod(date?: string): Promise<ApiResponse<ApodImage>> {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        ...(date && { date }),
      });

      const response = await fetch(
        `${this.baseUrl}/planetary/apod?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApodImage = await response.json();

      if (config.features.enableLogging) {
        console.log('APOD Data:', data);
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (config.features.enableLogging) {
        console.error('APOD Fetch Error:', errorMessage);
      }
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Fetch APOD for a range of dates
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @returns Promise with array of APOD data
   */
  async getApodRange(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<ApodImage[]>> {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        start_date: startDate,
        end_date: endDate,
      });

      const response = await fetch(
        `${this.baseUrl}/planetary/apod?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApodImage[] = await response.json();

      if (config.features.enableLogging) {
        console.log('APOD Range Data:', data);
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (config.features.enableLogging) {
        console.error('APOD Range Fetch Error:', errorMessage);
      }
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get random APOD images
   * @param count - Number of random images to fetch
   * @returns Promise with array of random APOD data
   */
  async getRandomApod(count: number = 5): Promise<ApiResponse<ApodImage[]>> {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        count: count.toString(),
      });

      const response = await fetch(
        `${this.baseUrl}/planetary/apod?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApodImage[] = await response.json();

      if (config.features.enableLogging) {
        console.log('Random APOD Data:', data);
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (config.features.enableLogging) {
        console.error('Random APOD Fetch Error:', errorMessage);
      }
      return { success: false, error: errorMessage };
    }
  }
}

export default new NasaService();
