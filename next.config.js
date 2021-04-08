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
    future: {
        webpack5: true,
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
});
