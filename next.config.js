const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  target: 'serverless',
  devIndicators: {
    autoPrerender: false,
  },
};

module.exports = withPlugins(
  [
    [withSourceMaps],
    [withCss],
    [
      withSass({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
      }),
    ],
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
