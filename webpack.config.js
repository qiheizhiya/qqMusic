const path = require("path");
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
	mode: "production",
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].[hash:5].js"
	},
	module: {
		rules: [{
				test: /\.(png)|(gif)|(jpg)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "images/[name].[hash:5].[ext]"
					}
				}]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin({ // 每次构建后清除dist文件夹
			cleanOnceBeforeBuildPatterns: [
				path.resolve(__dirname, 'dist'),
			],
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new CopyPlugin([{
			from: "./public",
			to: "./"
		}])
	],
	stats: {
		colors: true,
		modules: false
	},
	devServer: {
		open: true,
		hot: true
	}
}