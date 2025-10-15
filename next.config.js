/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.line-scdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.line.me',
        pathname: '/**',
      },
    ],
  },
};
