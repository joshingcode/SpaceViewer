export interface AppConfig {
  nasaApiKey: string;
  nasaApiBaseUrl: string;
  appName: string;
  environment: 'development' | 'production' | 'staging';
  features: {
    enableLogging: boolean;
    enableOfflineMode: boolean;
  };
}

const config: AppConfig = {
  nasaApiKey: 'DxVsO0yiNhjvr89vRTsaUG3RhFbFR4fskhIwA4XZ',
  nasaApiBaseUrl: 'https://api.nasa.gov',
  appName: 'NASA Space Viewer',
  environment: (process.env.NODE_ENV as any) || 'development',
  features: {
    enableLogging: true,
    enableOfflineMode: true,
  },
};

export default config;
