/** @type {import('next').NextConfig} */

var path = require("path");
const nextConfig = {
  experimental: {
    appDir: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
     @import "stylesheets/abstracts/functions.scss";
     @import "stylesheets/abstracts/variables.scss";
     @import "stylesheets/abstracts/mixins.scss";
     `
  }
}

module.exports = nextConfig
