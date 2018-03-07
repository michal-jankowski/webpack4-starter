const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Obiekt konfiguracyjny webpacka
module.exports = {

    // entry point
    entry: "./src/js/app.js",

    // output object
    output: {
        publicPath: "/dist/",
        // dla właściwości path musimy podać ścieżkę absolutną (patrz import modułu path)
        path: resolve(__dirname, "dist/"),
        filename: "bundle.js"
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
        })
    ],

    node: {
        fs: "empty" // avoids error messages (check documentation: https://github.com/emaphp/handlebars-template-loader)
    }

};