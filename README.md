# Alfheim IA

This project is a demo web platform for showcasing Alfheim AI. The interface has been fully redesigned with light and dark themes.

## Installation

1. Install dependencies:

```bash
npm install
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

For a production-like build without deploying, use the preview command:

```bash
npm run preview
```

## Build and Deploy

Deployment uses Firebase Hosting. Make sure the Firebase CLI is available. You can install it globally:

```bash
npm install -g firebase-tools
```

The build script runs Firebase via `npx`, so a global install is optional. To build and deploy:

```bash
npm run build
```

This will execute `vite build` and then `npx firebase deploy --only hosting`.
You can verify the production build locally with `npm run preview`.
