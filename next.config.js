/** @type {import('next').NextConfig} */

var path = require("path");
const nextConfig = {
  experimental: {
    appDir: true
  },
  sassOptions: {
    prependData: `
     @import "stylesheets/abstracts/index.scss";
     `
  }
}

module.exports = nextConfig
