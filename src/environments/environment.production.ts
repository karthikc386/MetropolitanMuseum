export const environment = {
  production: true,
  apiBaseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
  appName: 'The Met: Digital Atelier',
  cacheTtlMs: 1000 * 60 * 60,
  featureFlags: {
    routeAnimations: true,
    dailyArtwork: true,
    timeline: true
  }
};
