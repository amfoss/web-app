const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const optimizedImages = require('next-optimized-images');
const path = require('path');

const nextConfig = {
  target: 'serverless',
  devIndicators: {
    autoPrerender: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  productionBrowserSourceMaps: true,
};

module.exports = withPlugins(
  [
    [optimizedImages],
    [
      withOffline({
        workboxOpts: {
          swDest: 'service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /[.](png|jpg|ico|css)/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
      }),
    ],
  ],
  nextConfig
);
