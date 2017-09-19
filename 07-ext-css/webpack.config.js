const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        publicPath: '/dist'
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

            /* {
                 test: /\.css$/,
                 // надо писать с лево на право. Первый справа.
                 use: ['style-loader', 'css-loader']
             },*/
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
       /* new webpack.LoaderOptionsPlugin({
            minimize: true
        })*/
        // new webpack.optimize.UglifyJsPlugin()
    ]

};
