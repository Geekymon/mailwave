/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: '/MailWave-Website/',
    basePath: '/MailWave-Website',
    images: {
      unoptimized: true,
    },
  }
  
  module.exports = nextConfig