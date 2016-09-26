'use strict';
import path from "path"
import webpack from "webpack"
import pkg from "./package.json"
const banner = `
  ${pkg.name} - ${pkg.description}
  Version: ${pkg.version}
`;

export default {
  entry: ['babel-polyfill', path.join(process.cwd(), 'src', 'js', 'index.js')],
  output: {
    library: 'red5protestbed',
    libraryTarget: 'umd',
    path: path.join(process.cwd(), 'build', 'script'),
    filename: 'red5pro-testbed.js'
  },
  devtool: "#inline-source-map",
  externals: [],
  module: {
    loaders: [
      // babel loader, testing for files that have a .js extension
      // (except for files in our node_modules folder!).
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          compact: false // because I want readable output
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
