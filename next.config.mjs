/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nqb8.co",
        port: "",
        pathname: "/storage/uploads/riders/identification-documents/**", // Match the specific path
      },
    ],
  },
};

export default nextConfig;
