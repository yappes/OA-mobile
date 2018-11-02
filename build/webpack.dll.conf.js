var webpack = require('webpack');
var path = require('path')
const utils = require('./utils')

var vendors = [
    "axios",
    "vue",
    "vue-router",
    "vuex",
    "less-loader",
    "less",
    "chalk",
    // path.resolve("__dirname", "../aui-m/aui-m.js"),
    path.resolve("__dirname", "../agreeSDK/agreeSDK.js"),
    path.resolve("__dirname", "../aui-m/theme-default/index.less")
];

function resolve(dir) {
    return path.join(__dirname, '..', dir)
  }

module.exports = {
    output: {
        path: path.resolve(__dirname, './dll-config'),
        filename: '[name].dll.js',
        library: '[name]',
    },
    entry: {
        lib: vendors,
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
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        },
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
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
        }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './dll-config', "[name]-manifest.json"),
            name: "[name]_library",
            // context: __dirnames
        })
    ],
};