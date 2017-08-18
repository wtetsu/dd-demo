const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./dist/index.js"
  },
  plugins: [
    new UglifyJSPlugin({
      minimize: true,
      sourceMap: true,
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }      
    })
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  module: {
  },
  devtool: "source-map"
};
