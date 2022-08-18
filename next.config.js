/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
