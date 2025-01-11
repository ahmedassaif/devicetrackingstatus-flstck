/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    trailingSlash: true, // Enable trailing slash
    images: {
        unoptimized: true,
      },
};

export default nextConfig;
