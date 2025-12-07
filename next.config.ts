import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// 1. Initialize the PWA wrapper
const withPWA = withPWAInit({
  dest: "public",
  // Cache strategies are now handled by default, but you can pass runtimeCaching if needed
  // runtimeCaching, 
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware.js$/,
    /_middleware.js.map$/,
    /middleware-build-manifest\.js$/,
    /middleware-react-loadable-manifest\.js$/,
  ],
});

// 2. Define your main Next.js config with types
const nextConfig: NextConfig = {
  // React Compiler is stable in Next.js 16 (no longer inside 'experimental')
  reactCompiler: true, 
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdbdata.vercel.app",
      },
      {
        protocol: "https",
        hostname: "cms2.castellersdebarcelona.cat",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
      },
    ],
  },
  
  async redirects() {
    return [
      {
        source: "/8-de-juny-de-1969",
        destination: "/historia/8-de-juny-de-1969",
        permanent: true,
      },
      {
        source: "/53-anys-53-tuits",
        destination: "/historia/53-anys-53-tuits",
        permanent: true,
      },
      {
        source: "/una-colla-singular-i-pionera",
        destination: "/historia/una-colla-singular-i-pionera",
        permanent: true,
      },
      {
        source: "/ca/videos/:id",
        destination: "/videos/:id",
        permanent: true,
      },
    ];
  },
};

// 3. Export the config wrapped in the PWA function
export default withPWA(nextConfig);