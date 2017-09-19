const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const inProd = (process.env.npm_lifecycle_script.includes(' -p'));
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dist = 'dist';
// Custom plugin
const BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');

const pathsToClean = [
    dist,
];

const cleanOptions = {
    root: __dirname,
    verbose: true, // logging
    dry: false
}


module.exports = {

    entry: {
        app: [
            './src/main.js',
        ],
        vendor: [
            'jquery'
        ]

    },

    output: {
        path: path.resolve(__dirname, dist),
        filename: "[name].js",
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
                test: /\.(jpg|png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(svg|eot|ttf|woof|woff2)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
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
            minimize: inProd,
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new BuildManifestPlugin('stats'),
    ]

};


