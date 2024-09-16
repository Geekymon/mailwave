/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: '/mailwave/',
    basePath: '/mailwave',
    images: {
      unoptimized: true,
    },
  }
  
  export default nextConfig;