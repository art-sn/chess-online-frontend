/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? "source-map" : false,
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html', minify: {collapseWhitespace: isProd}}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "style.[contenthash].css"}),
        new ESLintPlugin({extensions: ['.js', '.ts']})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
        port: 3333
    }
}