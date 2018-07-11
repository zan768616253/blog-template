'use strict';
require('dotenv').config();
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  index: path.join(__dirname, 'server'),
  app  : path.join(__dirname, 'client'),
  both : path.join(__dirname, 'both'),
};

const env = process.env.NODE_ENV || 'dev';

console.log('NODE_ENV =', env);

let config = {
  entry: {
   client: ['./client/home.js', './both/app.scss'],
   vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-router-dom', 'react-router-config', 'react-router-redux', 'redux-connect', 'reselect'],
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: (env === 'dev') ? '[name].js' : '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [ 'transform-decorators-legacy', 'dynamic-import-webpack' ],
          presets: ['env', 'react', 'es2015', 'stage-2'],
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      }
    ],
  },
  resolve: {
      extensions: ['.js', '.jsx'],
  },
  plugins: [
      new ExtractTextPlugin({
          filename:'style.css',
          allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
      })
  ]
};

if(env === 'dev') {
  config.devtool = 'source-map';
}

if (env === 'staged' || env === 'production') {
  config.devtool = 'nosources-source-map';

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin({
        exclude: ["style.css", "client.js", "vendor.js"],
    }),
  );
}
module.exports = config;
