# Metropolitan Museum

An Angular application for browsing The Metropolitan Museum of Art's public collection. The app presents the collection as a polished digital archive with artwork-first browsing, search, curated collection views, artist pages, a timeline, and a daily artwork feature.

## Features

- Home page with a cinematic featured artwork and curated collection links
- Discovery search with department filtering and artist/culture matching
- Artwork detail pages guarded by valid artwork IDs
- Artist detail pages, collection browsing, search results, timeline, and daily artwork routes
- Shared UI components for artwork cards, section headers, empty states, and loading skeletons
- API services for The Met Collection API with retry handling and environment-based configuration

## Tech Stack

- Angular 21
- TypeScript 5.9
- RxJS
- Sass
- Karma and Jasmine for unit testing

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser. The app reloads automatically when source files change.

## Available Scripts

```bash
npm start
```

Runs the Angular development server.

```bash
npm run build
```

Builds the production app into `dist/`.

```bash
npm run watch
```

Builds in development mode and watches for changes.

```bash
npm test
```

Runs the unit test suite with Karma and Jasmine.

## Project Structure

```text
src/
  app/
    core/          API services, models, guards, and interceptors
    features/      Route-level pages such as home, discover, artwork details, and timeline
    layouts/       Application shell layout
    shared/        Reusable components and pipes
  environments/    API URL, app name, cache settings, and feature flags
  styles.scss      Global styles
```

## Configuration

The app uses The Met Collection API:

```text
https://collectionapi.metmuseum.org/public/collection/v1
```

Environment settings live in `src/environments/`. Use these files to adjust API base URLs, cache durations, app naming, or feature flags for local and production builds.

## Routes

- `/` - Home
- `/discover` - Search and filter the collection
- `/artworks/:id` - Artwork details
- `/artists/:name` - Artist details
- `/collections` - Collection browsing
- `/timeline` - Timeline view
- `/daily` - Daily artwork
- `/search` - Search results

## Notes

This project depends on the public Met Collection API. Network availability and upstream API responses can affect artwork images, search results, and detail pages during development.
