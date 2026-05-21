import { Routes } from '@angular/router';
import { artworkIdGuard } from './core/guards/artwork-id.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    data: { animation: 'home', title: 'The Met Digital Atelier' }
  },
  {
    path: 'discover',
    loadComponent: () => import('./features/discover/discover.page').then((m) => m.DiscoverPage),
    data: { animation: 'discover', title: 'Discover Artworks' }
  },
  {
    path: 'artworks/:id',
    canActivate: [artworkIdGuard],
    loadComponent: () => import('./features/artwork-details/artwork-details.page').then((m) => m.ArtworkDetailsPage),
    data: { animation: 'artwork', title: 'Artwork Details' }
  },
  {
    path: 'artists/:name',
    loadComponent: () => import('./features/artist-details/artist-details.page').then((m) => m.ArtistDetailsPage),
    data: { animation: 'artist', title: 'Artist Details' }
  },
  {
    path: 'collections',
    loadComponent: () => import('./features/collections/collections.page').then((m) => m.CollectionsPage),
    data: { animation: 'collections', title: 'Collections' }
  },
  {
    path: 'timeline',
    loadComponent: () => import('./features/timeline/timeline.page').then((m) => m.TimelinePage),
    data: { animation: 'timeline', title: 'Timeline' }
  },
  {
    path: 'daily',
    loadComponent: () => import('./features/daily-artwork/daily-artwork.page').then((m) => m.DailyArtworkPage),
    data: { animation: 'daily', title: 'Daily Artwork' }
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search-results/search-results.page').then((m) => m.SearchResultsPage),
    data: { animation: 'search', title: 'Search Results' }
  },
  {
    path: 'not-found',
    loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
    data: { animation: 'not-found', title: 'Not Found' }
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
