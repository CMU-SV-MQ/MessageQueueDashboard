/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // JavaScript files are allowed, TypeScript is not mandatory.
    ignoreBuildErrors: true,
  },
  // Redirect root path to /operations
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/operations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

