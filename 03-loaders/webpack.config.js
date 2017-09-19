const path = require('path');

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
            }
        ]

    }

};
