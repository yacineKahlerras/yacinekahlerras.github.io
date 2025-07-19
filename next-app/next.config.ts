/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out",
  generateEtags: "/",
  assetPrefix: "/",
  basePath: "",
};

module.exports = nextConfig;
