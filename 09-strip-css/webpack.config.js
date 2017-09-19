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
        // publicPath: '/dist'
    },

    module: {

        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                     use: ['css-loader', 'sass-loader'],
                    // use: [
                    //     {
                    //         loader: 'css-loader',
                    //         options: {url: false}
                    //     },
                    //     'sass-loader'
                    // ],
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
                            name: 'images/[name].[ext]',

                            // Если не указывать этот параметр,
                            // то все будет в одну папку копироваться
                            //   outputPath: 'img/',

                            // publicPath: './img/'
                        }
                    }
                ]
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
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: prod,
           // paths: glob.sync(path.join(__dirname, 'dist/*.html')),
        }),
        /* new webpack.LoaderOptionsPlugin({
             minimize: true
         })*/
        // new webpack.optimize.UglifyJsPlugin()
    ]

};
