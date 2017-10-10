const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
    entry: {
        index: path.join(__dirname, '../src', 'index.js')
    },

    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].js',
        publicPath: '/'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            use: 'file-loader?name=img/[name].[ext]'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            modules: true,
                            minimize: true,
                            localIdentName: '[hash:base64:7]'
                        },
                    },
                    'postcss-loader'
                ]
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new HtmlWebpackPlugin(),
        new webpack.BannerPlugin(`${pkg.name}-${new Date()}. RELEASE.`),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            PROJECT_ENV: JSON.stringify('release')
        })
    ]
};
