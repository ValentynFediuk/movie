/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        appDir: true
    },
    sassOptions: {
        prependData: `
     @import "stylesheets/abstracts/index.scss";
     `
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/original/**',
            },
        ],
    },
}

module.exports = nextConfig
