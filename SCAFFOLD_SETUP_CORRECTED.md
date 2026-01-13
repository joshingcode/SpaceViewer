# React Scaffold Project - Corrected Setup Instructions

This document contains the updated instructions based on real-world implementation learnings from the NASA Space Viewer project.

## Project Setup (Updated)

### 1. Create Base Scaffold Project
```bash
mkdir react-scaffold
cd react-scaffold
npm init -y
```

### 2. Install Core Dependencies
```bash
npm install react react-dom
npm install --save-dev @vitejs/plugin-react typescript vite
npm install --save-dev tailwindcss postcss autoprefixer
npm install --save-dev @types/react @types/react-dom @types/node
```

### 3. Update package.json
```json
{
  "name": "react-scaffold",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Reusable React Scaffold Project",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

## Critical Configuration Files

### index.html (ROOT DIRECTORY - NOT in public/)
**IMPORTANT:** This file MUST be in the root directory, not in `public/`. Vite expects it there.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Your App Description" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

### postcss.config.js (ES Module Syntax - NOT CommonJS)
**IMPORTANT:** Use `export default` NOT `module.exports` when package.json has `"type": "module"`

```javascript
/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.js
**NOTE:** `@tailwindcss/line-clamp` plugin is deprecated and removed in Tailwind v3. Use native `line-clamp` class instead.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0f172a',
          darker: '#111827',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## Project Structure

```
react-scaffold/
├── index.html                  # ROOT LEVEL (NOT in public/)
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   ├── layouts/           # Layout components
│   │   └── features/          # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API calls & services
│   ├── store/                 # State management
│   ├── types/                 # TypeScript definitions
│   ├── styles/                # Global styles
│   ├── config/                # Configuration files
│   ├── App.tsx                # Root component
│   └── index.tsx              # Entry point
├── public/                    # Static assets (favicon, etc.)
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js          # USE ES MODULE SYNTAX
├── tailwind.config.js
└── .gitignore
```

## Key Files Templates

### src/index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### src/App.tsx
```typescript
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="text-white">Welcome to React Scaffold</h1>
    </div>
  );
}

export default App;
```

### src/styles/index.css
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

html,
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

## Common Pitfalls & Solutions

### ❌ Problem: 404 Error on Localhost
**Cause:** `index.html` placed in `public/` directory instead of root
**Solution:** Move `index.html` to the project root directory

### ❌ Problem: PostCSS Module Error
**Error:** `module is not defined in ES module scope`
**Cause:** Using CommonJS syntax in `postcss.config.js` with `"type": "module"` in package.json
**Solution:** Use ES module syntax: `export default { ... }` instead of `module.exports = ...`

### ❌ Problem: Tailwind CSS Plugin Not Found
**Error:** `Cannot find module '@tailwindcss/line-clamp'`
**Cause:** Plugin was removed in Tailwind v3
**Solution:** Remove the plugin and use native `line-clamp-*` classes: `line-clamp-1`, `line-clamp-2`, etc.

### ❌ Problem: Ports Already in Use
**Error:** `Port 3000 is in use`
**Solution:** Vite automatically tries next available port (3001, 3002, etc.)

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

### .env.example
```
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_ENABLE_LOGGING=false
REACT_APP_ENABLE_OFFLINE_MODE=false
```

### src/config/config.ts
```typescript
export interface AppConfig {
  apiBaseUrl: string;
  enableLogging: boolean;
  enableOfflineMode: boolean;
}

const config: AppConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true',
  enableOfflineMode: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
};

export default config;
```

## Development Workflow

1. **Create Feature Components** in `src/components/features/`
2. **Create Reusable Components** in `src/components/common/`
3. **Create Custom Hooks** in `src/hooks/`
4. **Create API Services** in `src/services/`
5. **Define Types** in `src/types/`
6. **Use Tailwind Classes** for styling

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance Tips

✅ **DO:**
- Use code splitting with React.lazy()
- Optimize images and assets
- Minify CSS/JS in production
- Use CSS custom properties for theming
- Lazy load heavy components

❌ **DON'T:**
- Import entire libraries when you only need one function
- Use inline styles excessively
- Forget to set proper Content Security Policy
- Ignore TypeScript strict mode warnings

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Vite not finding modules | Check import paths (case-sensitive) |
| Tailwind styles not applying | Verify content paths in tailwind.config.js |
| HMR not working | Restart dev server: `npm run dev` |
| Build fails | Run `npm run build` to see detailed errors |
| Port conflicts | Kill the process: `lsof -ti:3000 \| xargs kill` |

## Next Steps

1. Customize theme colors in `tailwind.config.js`
2. Set up global state management (Zustand, Redux, etc.)
3. Implement API service layer
4. Add authentication if needed
5. Set up testing framework (Vitest, Jest)
6. Configure CI/CD pipeline
7. Add pre-commit hooks with Husky

---

**Last Updated:** January 2026  
**Based on:** NASA Space Viewer Production Experience
