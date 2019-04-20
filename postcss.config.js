const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const cssimport = require("postcss-import");
const postcssNormalize = require("postcss-normalize");
const customProperties = require("postcss-custom-properties");
const cssfor = require("postcss-for");

module.exports = {
  plugins: [
    cssimport(),
    customProperties(),
    postcssNormalize({ forceImport: true }),
    autoprefixer(),
    cssnano(),
    cssfor()
  ]
};
