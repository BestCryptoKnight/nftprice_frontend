/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cssLoaderOptions: {
    url: false,
  },
  distDir: 'build',
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  trailingSlash: true
}

module.exports = nextConfig
