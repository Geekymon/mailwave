/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: '/mailwave/',
    basePath: '/mailwave',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }
  
  export default nextConfig;