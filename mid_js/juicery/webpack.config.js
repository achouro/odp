import path from "node:path";

import HtmlWebpackPlugin from "html-webpack-plugin";

export default{
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(import.meta.dirname, "dist"), //path:"dist"
        clean:true,
    },

    devtool: "eval-source-map",
    devServer:{watchFiles:["./src/template.html"],
                //static: './dist',
                //hot: true,

    },

    plugins:[ new HtmlWebpackPlugin({template:"./src/template.html",}),],

    module:{ 
        rules:[
            {
                test:/\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test:/\.html$/i,
                use:"html-loader",
            },
            {
                test:/\.js$/i,
                use:"html-loader",
                options:{
                    sources:{
                        list:[{
                            tag: "img",
                            attribute:"src",
                            type:"src",
                        }]

                    }
                }
            },

            {
                test: /\.(png|svg|jpg|gif)$/i,
                type:"asset/resource",

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            
        ],
    },

}

