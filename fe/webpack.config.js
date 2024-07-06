const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/main.jsx'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
        assetModuleFilename: "[name][ext]",
        // 물어볼것: publicPath '/'말고 다른걸로 설정하면, react import가 안됨.
        publicPath: "/" // 브라우저에서 실행할때, 주소의 prefix이다. HtmlWebpackPlugin의 publicPath와 맞춰 줘야 한다.
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
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
                test: /\.(jpg|webp)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // ['@babel/preset-env', {targets: "defaults"}]
                            ["@babel/preset-react", {"runtime": "automatic"}]// 리액트용
                        ],
                        compact: true // babel이 생성하는 코드의 크기를 줄여준다.
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "웹팩 공부",
            filename: "index.html",
            template: "src/template.html",
            publicPath: "/" // 생성되는 html파일에 script 태그의 src 옵션에 경로의 prefix로 붙는것
        }),
        // new BundleAnalyzerPlugin()
    ]
}