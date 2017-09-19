const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
//const prod = process.argv.indexOf('-p') !== -1;
const inProd = (process.env.npm_lifecycle_script.includes(' -p'));
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
const pathsToClean = [
    'dist',
    // 'build'
];

// the clean options to use
const cleanOptions = {
    root: __dirname,
    verbose: true, // logging
    dry: false
}


module.exports = {

    entry: {
        app: [
            './src/main.js',
            //'./src/main.scss'
        ],
        // style: [
        //     './src/main.scss'
        // ],
        vendor: [
            'jquery'
        ]

    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash].js",
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
                test: /\.(jpg|png|jpe?g|gif|svg|eot|ttf|woof|woff2)$/,
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
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProd,
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
    ]

};
