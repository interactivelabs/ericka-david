const path = require("path");
const mode = process.env.NODE_ENV || "production";

module.exports = {
  entry: "./assets/js/main.js",
  mode: mode,
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "main.js"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  externals: {
    ScrollReveal: "ScrollReveal"
  }
};
