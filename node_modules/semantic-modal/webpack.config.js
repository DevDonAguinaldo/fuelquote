const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'semantic-modal': './src/Main',
        'semantic-modal.min': './src/Main'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'SemanticModal',
        libraryTarget: 'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            }
        ]
    }
};