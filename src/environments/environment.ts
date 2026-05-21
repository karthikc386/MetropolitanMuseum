export const environment = {
  production: false,
  apiBaseUrl: 'https://collectionapi.metmuseum.org/public/collection/v1',
  appName: 'The Met: Digital Atelier',
  cacheTtlMs: 1000 * 60 * 20,
  featureFlags: {
    routeAnimations: true,
    dailyArtwork: true,
    timeline: true
  }
};
