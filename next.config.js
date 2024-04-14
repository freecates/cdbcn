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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdbdata.vercel.app',
            },
            {
                protocol: 'https',
                hostname: 'cms.castellersdebarcelona.cat',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'live.staticflickr.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/8-de-juny-de-1969',
                destination: '/historia/8-de-juny-de-1969',
                permanent: true,
            },
            {
                source: '/53-anys-53-tuits',
                destination: '/historia/53-anys-53-tuits',
                permanent: true,
            },
            {
                source: '/una-colla-singular-i-pionera',
                destination: '/historia/una-colla-singular-i-pionera',
                permanent: true,
            },
            {
                source: '/ca/videos/:id',
                destination: '/videos/:id',
                permanent: true,
            },
        ];
    },
});
