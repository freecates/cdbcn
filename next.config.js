const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
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
    i18n: {
        locales: ['ca'],
        defaultLocale: 'ca',
    },
    swcMinify: true,
    experimental: {
        appDir: true,
      },
});
