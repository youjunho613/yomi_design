/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tzzlrpratpmhrgdwxakp.supabase.co" },
      { protocol: "http", hostname: "localhost:3000" },
      { protocol: "https", hostname: "strongpojang.com" },
    ],
  },
};

module.exports = nextConfig;
