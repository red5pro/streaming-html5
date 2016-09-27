'use strict';
import path from "path"
import webpack from "webpack"
import pkg from "./package.json"
const banner = `
  ${pkg.name} - ${pkg.description}
  Version: ${pkg.version}
`;

export default {
  entry: ['babel-polyfill',
          path.join(process.cwd(), 'src', 'js', 'index.js'),
          path.join(process.cwd(), 'src', 'index.html')],
  output: {
    library: 'red5protestbed',
    libraryTarget: 'umd',
    path: path.join(process.cwd(), 'build'),
    filename: 'script/red5pro-testbed.js'
  },
  devtool: "#inline-source-map",
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-redux": "ReactRedux"
  },
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
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.IgnorePlugin(/react/, /react-(redux|dom)/)
  ]
};
