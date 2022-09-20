/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});
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
module.exports = withPWA(nextConfig);
