/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i1-vnexpress.vnecdn.net",
      "i1-kinhdoanh.vnecdn.net",
      "i1-giaitri.vnecdn.net",
      "i1-khoahoc.vnecdn.net",
      "i1-thethao.vnecdn.net",
    ],
  },
};

module.exports = nextConfig;
