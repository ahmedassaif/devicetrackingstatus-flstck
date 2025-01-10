/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', trailingSlash: true, // Enable trailing slash
    images: {
        unoptimized: true,
      },
};

export default nextConfig;
