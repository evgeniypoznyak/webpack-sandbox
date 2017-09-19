const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const prod = process.argv.indexOf('-p') !== -1;
module.exports = {

    entry: {
        app: [
            './src/main.js',
            './src/main.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {

        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                     use: ['css-loader', 'sass-loader'],
                    fallback: ['style-loader']
                })
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {

                            // Если не указывать этот параметр,
                            // то будет вместо имени хеш
                            // images/  - относительный каталог в public директории
                            name: 'images/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        ]

    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: prod,
        }),
    ]

};
