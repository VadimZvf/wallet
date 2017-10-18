const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
    entry: {
        index: path.join(__dirname, '../develop', 'index.js')
    },

    output: {
        path: path.join(__dirname, '../public'),
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
            use: 'file-loader?name=img/[name].[hash].[ext]'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            // modules: true,
                            minimize: false,
                            // localIdentName: '[folder]__[name]__[local]--[hash:base64:5]'
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
        new webpack.BannerPlugin(`${pkg.name}-${new Date()}. DEBUG.`),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../develop', 'index.ejs')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('develop')
            },
            PROJECT_ENV: JSON.stringify('debug')
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, '../public')
    }
};
