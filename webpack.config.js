var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './app/main.js'
    ],
    output: {
        path: path.resolve(__dirname, './app/public/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devtool: 'source_map'
}
