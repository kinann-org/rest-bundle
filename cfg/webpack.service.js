var path = require('path');
var webpack = require('webpack');
var common = require("./webpack.common");

module.exports = Object.assign(common, {
    entry: './src/ui/main-service.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'build-service.js'
    },
});
