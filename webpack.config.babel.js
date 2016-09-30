import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import pkg from './package.json'
const banner = `
  ${pkg.name} - ${pkg.description}
  Version: ${pkg.version}
`;

export default {
  entry: [
    // 'babel-polyfill', // <- NOTE: not required since we are loading in red5pro-sdk which already packs it
          path.join(process.cwd(), 'src', 'js', 'index.js'),
          path.join(process.cwd(), 'src', 'index.html')],
  output: {
    library: 'red5protestbed',
    libraryTarget: 'umd',
    path: path.join(process.cwd(), 'build'),
    filename: 'script/red5pro-testbed.js'
  },
  devtool: '#inline-source-map',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'red5pro-sdk': 'red5prosdk'
  },
  module: {
    loaders: [
      // babel loader, testing for files that have a .js extension
      // (except for files in our node_modules folder!).
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          compact: false // because I want readable output
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.IgnorePlugin(/react/, /react-(redux|dom)/, 'red5pro-sdk'),
    new CopyWebpackPlugin([
      {
        from: 'static/lib',
        to: 'lib'
      },
      {
        from: 'static/css',
        to: 'css'
      },
      {
        from: 'static/favicon.ico',
        to: ''
      }
    ])
  ]
};
