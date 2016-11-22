
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

    // module: {
    //     loaders: [{
    //         test: /\.html$/,
    //         loader: 'file?name=templates/[name]-[hash:6].html'
    //     }, {
    //         test: /\.css$/,
    //         loader: "style!css"
    //     }, {
    //         test: /\.js$/,
    //         exclude: /(node_modules)/,
    //         loader: "ng-annotate?add=true!babel"
    //     }, {
    //         test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/],
    //         loader: 'file?name=fonts/[name].[ext]'
    //     }]
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './lib/index.html'
    //     })
    // ]
};