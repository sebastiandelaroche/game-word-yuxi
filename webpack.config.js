
var webpack = require('webpack');

module.exports = {
    entry: './angular/app.js',
    output: {
        path: './public/js',
        filename: 'bundle.min.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: { presets: ['es2015'] }
        }, { 
            test: /\.html$/, 
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, { 
            test: /\.(woff|woff2|eot|ttf|svg)$/, 
            loader: 'url' 
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};