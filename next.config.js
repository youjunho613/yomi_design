/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tzzlrpratpmhrgdwxakp.supabase.co" },
      { protocol: "http", hostname: "localhost:3000" },
      { protocol: "https", hostname: "cdn.imweb.me" },
      { protocol: "https", hostname: "ganpandirect.com" },
      { protocol: "https", hostname: "sonoad.com" },
      { protocol: "https", hostname: "shop-phinf.pstatic.net" },
      { protocol: "https", hostname: "strongpojang.com" },
    ],
  },
};

module.exports = nextConfig;
