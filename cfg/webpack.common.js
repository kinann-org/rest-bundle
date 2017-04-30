var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './cfg/polyfills.ts',
        'vendor': './cfg/vendor.ts',
        'app': './src/ui/app/main-aot.ts',
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: helpers.root('src/ui', 'tsconfig-dist.json')
                    }
                }, 'angular2-template-loader']
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }, { // application css
                test: /\.css$/,
                exclude: helpers.root('src/ui', 'app'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap'
                })
            }, { // NgComponent css
                test: /\.css$/,
                include: helpers.root('src/ui', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src/ui'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        // RestBundle relies on nodejs express EJS templates
        // to provide custom Angular root html for each named service
        //new HtmlWebpackPlugin({ template: 'TBD.html' /})
    ]
};
