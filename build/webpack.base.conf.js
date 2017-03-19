var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
        return path.join(__dirname, '..', dir)
}

module.exports = {
        entry: {
                app: './src/main.js'
        },
        output: {
                path: config.build.assetsRoot,
                filename: '[name].js',
                publicPath: process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
        },
        resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                        'vue$': 'vue/dist/vue.runtime.js',
                        '@': resolve('src'),
                        'vendor': resolve('src/vendor'),
                        'assets': resolve('src/assets'),
                        'scss': resolve('src/assets/scss'),
                        'images': resolve('src/assets/images'),
                        'service': resolve('src/service'),
                        'components': resolve('src/components'),
                        'viewcommon': resolve('src/views/common'),
                        'mock': resolve('src/mock')
                }
        },
        module: {
                rules: [{
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                }, {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [resolve('src'), resolve('test')]
                }, {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        query: {
                                limit: 10000,
                                name: utils.assetsPath('img/[name].[hash:7].[ext]')
                        }
                }, {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: 'url-loader',
                        query: {
                                limit: 10000,
                                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                        }
                }]
        }
}

