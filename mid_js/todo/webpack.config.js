const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"), 
        clean: true,
        publicPath: "/",
    },

    devtool: "eval-source-map",
    devServer: {
        watchFiles: ['src/**/*'], 
        static: './dist',
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({ 
            template: "./src/template.html",
            scriptLoading: 'defer',
            inject: 'body'  
        }),
    ],

    module: { 
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                use: "html-loader",
                exclude: path.resolve(__dirname, "src/template.html"), 
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
