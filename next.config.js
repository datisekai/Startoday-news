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
      "vcdn1-vnexpress.vnecdn.net",
      "vcdn1-kinhdoanh.vnecdn.net",
      "vcdn1-giaitri.vnecdn.net",
      "vcdn1-khoahoc.vnecdn.net",
      "vcdn1-thethao.vnecdn.net",
    ],
  },
};

module.exports = nextConfig;
