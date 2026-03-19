/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/r2/:path*',
        destination: 'https://pub-37f5a13b98614f0ebd7e5db4e5874f30.r2.dev/:path*',
      },
    ];
  },
};

export default nextConfig;
