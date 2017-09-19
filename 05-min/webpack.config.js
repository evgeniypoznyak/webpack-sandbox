const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },

    module: {

        rules: [
            {
                test: /\.css$/,
                // надо писать с лево на право. Первый справа.
                use: ['style-loader', 'css-loader']
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
        // new webpack.optimize.UglifyJsPlugin()
    ]

};
