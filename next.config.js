const runtimeCaching = require('@ducanh2912/next-pwa');
const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [
        /middleware-manifest\.json$/,
        /_middleware.js$/,
        /_middleware.js.map$/,
        /middleware-build-manifest\.js$/,
        /middleware-react-loadable-manifest\.js$/,
    ],
});

module.exports = withPWA({
    images: {
        domains: [
            'cdbdata.vercel.app',
            'cms.castellersdebarcelona.cat',
            'i.ytimg.com',
            'live.staticflickr.com',
        ],
    },
    swcMinify: true,
    experimental: {
        appDir: true,
      },
});
