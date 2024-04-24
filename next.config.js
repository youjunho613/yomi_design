/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tzzlrpratpmhrgdwxakp.supabase.co" },
      { protocol: "http", hostname: "localhost:3000" },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
