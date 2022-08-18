/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "source.unsplash.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
