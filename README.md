# NASA Space Viewer

A modern React application that displays NASA's Astronomy Picture of the Day (APOD) with an elegant, interactive interface.

## Features

✨ **Core Features:**
- 🚀 Browse NASA's Astronomy Picture of the Day (APOD)
- 📅 Select any date from June 16, 1995 to today
- ❤️ Save and manage favorite images
- 🎨 Beautiful dark-themed UI with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Real-time API integration with NASA
- 🎥 Support for both images and videos

## Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **NASA API Key** (optional - DEMO_KEY included, limited requests)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` to add your NASA API key:

```env
REACT_APP_NASA_API_KEY=YOUR_API_KEY_HERE
REACT_APP_NAME=NASA Space Viewer
REACT_APP_ENABLE_LOGGING=false
REACT_APP_OFFLINE_MODE=false
```

**Get Your Free NASA API Key:**
1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Fill out the registration form
3. Copy your API key and paste it in `.env.local`

### 3. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check code for linting errors
npm run lint

# Format code with Prettier
npm run format
```

## Project Structure

```
nasa-space-viewer/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── ImageCard.tsx    # APOD image/video display
│   │   │   ├── Header.tsx       # App header
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── features/            # Feature-specific components
│   │       └── SpaceViewer.tsx  # Main feature component
│   ├── hooks/
│   │   └── useFetch.ts          # Custom data fetching hook
│   ├── services/
│   │   └── nasaService.ts       # NASA API service layer
│   ├── config/
│   │   └── config.ts            # Configuration management
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── styles/
│   │   └── index.css            # Global styles
│   ├── App.tsx                  # Root component
│   └── index.tsx                # Entry point
├── public/
│   └── index.html               # HTML template
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
├── .env.example                 # Environment template
└── .gitignore                   # Git ignore rules
```

## Usage Guide

### Browse APOD

1. **Select a Date:** Use the date picker to choose any date from June 16, 1995 to today
2. **View Image/Video:** The selected APOD displays with title, date, copyright, and description
3. **Download HD Version:** Click "View HD Image" to download the full resolution image

### Manage Favorites

1. **Add to Favorites:** Click the red heart icon on any image
2. **View All Favorites:** Click the "Favorites" button to see saved images
3. **Remove from Favorites:** Click the heart icon again to remove

### Key Components

#### ImageCard Component
Displays APOD images/videos with:
- Media preview (image or embedded video)
- Favorite toggle button
- Title and metadata
- Full description
- HD image download link

#### SpaceViewer Feature
Main application logic:
- Date selection and API calls
- Favorite management
- Loading and error states
- Responsive layout

#### Custom Hooks

**useFetch**
```typescript
const { data, loading, error } = useFetch(
  () => nasaService.getApod(date),
  [date]
);
```

#### API Service

**nasaService**
```typescript
// Fetch single APOD
nasaService.getApod(date)

// Fetch date range
nasaService.getApodRange(startDate, endDate)

// Fetch random images
nasaService.getRandomApod(count)
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_NASA_API_KEY` | NASA API authentication key | `DEMO_KEY` |
| `REACT_APP_NAME` | Application name | `NASA Space Viewer` |
| `REACT_APP_ENABLE_LOGGING` | Enable console logging | `false` |
| `REACT_APP_OFFLINE_MODE` | Offline mode (not implemented) | `false` |

### Tailwind CSS

Customizable theme in `tailwind.config.js`:
- Dark space-themed color palette
- Smooth animations and transitions
- Custom scrollbar styling

## Styling

The application uses **Tailwind CSS** for styling:

- **Dark Theme:** Space-inspired dark color scheme
- **Responsive Design:** Mobile-first approach
- **Smooth Animations:** Hover effects and transitions
- **Custom Scrollbar:** Styled to match the theme

## TypeScript Types

Full TypeScript support with custom types:

```typescript
interface ApodImage {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

interface ApodImageData extends ApodImage {
  isFavorite?: boolean;
  savedAt?: string;
}
```

## Error Handling

The application includes robust error handling:
- Network error detection
- User-friendly error messages
- Retry functionality
- API rate limit handling

**Common Issues:**

| Issue | Solution |
|-------|----------|
| 429 Error (Rate Limited) | Use a personal NASA API key or wait 1 hour |
| Invalid Date | Select dates from June 16, 1995 onwards |
| CORS Errors | NASA API supports CORS; ensure correct API key |
| Favorites Not Saving | Stored in browser state; refresh clears them |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lazy Loading:** Images load asynchronously
- **Optimized Rendering:** React 18 Strict Mode enabled
- **Minimal Bundle:** Tree-shaking reduces JS bundle
- **CSS Optimization:** Tailwind purges unused styles

## Development

### Code Quality

```bash
# Run linting
npm run lint

# Format code
npm run format
```

### Adding New Features

1. **New API Endpoints:** Update `src/services/nasaService.ts`
2. **New Components:** Create in `src/components/features/` or `src/components/common/`
3. **New Hooks:** Add to `src/hooks/`
4. **New Types:** Update `src/types/index.ts`

## Deployment

### Build for Production

```bash
npm run build
```

Creates optimized bundle in `dist/` directory.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## NASA API Information

**Astronomy Picture of the Day (APOD)**
- **Endpoint:** `https://api.nasa.gov/planetary/apod`
- **Documentation:** [NASA APOD API Docs](https://github.com/nasa/apod-api)
- **Rate Limits:** 50 requests/hour (DEMO_KEY), unlimited with personal key
- **Data Source:** Updated daily with space images and explanations

## Future Enhancements

- [ ] Local storage persistence for favorites
- [ ] Share favorites on social media
- [ ] Image gallery with multiple APOD sources
- [ ] Dark/Light theme toggle
- [ ] Advanced search and filtering
- [ ] User authentication system
- [ ] Multiple NASA API integrations (Mars Rover, Asteroids, etc.)

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Credits

- **NASA APIs:** [nasa.gov](https://www.nasa.gov/)
- **React:** [react.dev](https://react.dev/)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com/)
- **Vite:** [vitejs.dev](https://vitejs.dev/)

## Support

Need help? Check the resources:

- [NASA API Documentation](https://api.nasa.gov/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

---

**Created with ❤️ for space enthusiasts everywhere** 🚀✨ 
