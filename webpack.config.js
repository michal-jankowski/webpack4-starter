const { resolve } = require("path");

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
            // BABEL-LOADER
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            // SASS LOADER
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
            },

            // URL LOADER ('file-loader' required!)
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

    node: {
        fs: "empty" // avoids error messages (check documentation: https://github.com/emaphp/handlebars-template-loader)
    }

};