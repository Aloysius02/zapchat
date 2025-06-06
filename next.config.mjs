/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match all requests starting with /api
        destination: 'https://zapchato-api.onrender.com/api/:path*', // Proxy to the backend
      },
    ];
  },
};

export default nextConfig;