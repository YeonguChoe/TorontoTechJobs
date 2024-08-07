const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/main.jsx"),
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true,
        assetModuleFilename: "[name][ext]",
        publicPath: "/",
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 4000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/",
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-react", {runtime: "automatic"}]],
                        compact: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Toronto Tech Jobs",
            filename: "index.html",
            template: "src/template.html",
            publicPath: "/",
        }),
        new CopyWebpackPlugin({
            patterns: [{from: "src/assets/favicon-32x32.png", to: "assets"}],
        }),
        new Dotenv(), // 환경 변수 로드
    ],
};
