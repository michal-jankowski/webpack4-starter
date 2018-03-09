const { resolve } = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Obiekt konfiguracyjny webpacka
module.exports = function(env) {

    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;
    
    return {

        // entry point
        entry: {
            app: "./src/js/app.js"
        },

        // output object
        output: {
            publicPath: dev ? "/dist/" : "",
            // dla właściwości path musimy podać ścieżkę absolutną (patrz import modułu path)
            path: resolve(__dirname, "dist/"),
            filename: prod ? "[name].[chunkhash].js" : "[name].js"
        },

        // Source Mapping
        devtool: prod ? "source-map" : "cheap-module-eval-source-map",

        // Code Splitting, to read more: https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            }
        },

        // Modules
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },

                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader"
                    })
                },

                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: "[name].[ext]"
                            }
                        }
                    ]
                },

                // HANDLEBARS LOADER (optional)
                {
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "handlebars-template-loader"
                    }
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin("main.css"),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.ProvidePlugin({
                // globalny import jquery do wszystkich modułów, które z niego korzystają
                $: "jquery",
                jQuery: "jquery"
            })
        ],

        node: {
            fs: "empty" // avoids error messages (check documentation: https://github.com/emaphp/handlebars-template-loader)
        }

    };
}