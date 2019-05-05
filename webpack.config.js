const path = require("path");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  entry: {
    main: ["whatwg-fetch", "./assets/js/main.js"],
    guests: ["whatwg-fetch", "./assets/js/guests.js"]
  },
  mode: mode,
  output: {
    path: path.resolve(__dirname, "public/js")
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
    ScrollReveal: "ScrollReveal"
  }
};
