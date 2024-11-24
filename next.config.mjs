/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "hghlaxlpgruvkrxnpvsv.supabase.co",
      },
    ],
  },
};

export default nextConfig;
