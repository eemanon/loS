const webpack = require('webpack');
const path = require('path');
const config = require('config');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})


/**
 * Stringify values to pass to DefinePlugin
 */
const packinize = (obj) => {
  const ret = Object.assign({}, obj);

  (function pack(o) {
    Object.keys(o).forEach((key) => {
      const v = o[key];
      if (typeof v === 'string' || typeof v === 'boolean') {
        o[key] = JSON.stringify(v);
      } else if (
        (typeof v === 'object') &&
        (typeof v !== 'function')
      ) {
        pack(v);
      }
    });
  }(ret));

  return ret;
};

var webpackConfig = {
  entry: ['babel-polyfill', APP_DIR + '/index.jsx'],

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module : {
    loaders : [
      {
        test : /\.jsx?/, exclude: /node_modules/, include : APP_DIR, loader : 'babel-loader'
      },
      {
        test: /\.css$/, use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 8081, // most common port
    contentBase: './public',
    inline: true,
    historyApiFallback: true
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      __CONFIG__: packinize(config)
    })
  ]
};

module.exports = webpackConfig;
