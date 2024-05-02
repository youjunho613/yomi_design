/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tzzlrpratpmhrgdwxakp.supabase.co" },
      { protocol: "http", hostname: "localhost:3000" },
    ],
  },
  typescript: {
    /* 빌드 오류 무시 */
    ignoreBuildErrors: true,
  },
};
