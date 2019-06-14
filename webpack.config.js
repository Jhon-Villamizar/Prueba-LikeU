const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: miniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new htmlWebpackPlugin({
            filename: 'characters.html',
            template: 'src/characters.html'
        }),
        new htmlWebpackPlugin({
            filename: 'episode.html',
            template: 'src/episode.html'
        }),
        new miniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ]
}