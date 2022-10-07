/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_API_URL: "http://localhost:8001/api",
  },
  i18n,
};

module.exports = nextConfig;
