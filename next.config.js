const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

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
    pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
    },
    future: {
      webpack5: true,
    },
});
