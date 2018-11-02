'use strict'
const path = require('path')
const utils = require('./utils')
var webpack = require('webpack');
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
var fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    modules: [resolve('ab-manager'), "node_modules"],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@studio': resolve('.studio/runtime'),
      'AUI': resolve('aui-m'),
      'Utils': resolve('aui-m/components/utils.js'),
      'AgreeSDK': resolve('agreeSDK/agreeSDK.js'),
      'static': resolve('static')
    }
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../ab-manager/loader')
    ]
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')] //  自动添加浏览器前缀
        }
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel',
        include: [resolve('aui-m/aui-m.js'), resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.less$/,
        loader: 'happypack/loader?id=happycss'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true || { /* CSSNano Options */ }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-salad')
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /ab-manager-config\.js/,
        loader: path.resolve(__dirname, './loader/ab-manager-loader.js'),
        include: [resolve('src')]
      },
      {
        test: /aui-m-config\.js/,
        loader: path.resolve(__dirname, './loader/aui-m-loader.js'),
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happycss',
      loaders: ['style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: true || { /* CSSNano Options */ }
          }
        }, 'postcss-loader', 'less-loader'
      ],
      threadPool: happyThreadPool,
      verbose: true
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}