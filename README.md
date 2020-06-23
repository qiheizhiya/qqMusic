# 音乐播放器
项目查看地址(切记网页分辨率要切换为移动端)： https://qiheizhiya.github.io/qqMusic/dist/index.html
**第一次切换歌曲图片没变是github服务器有点慢，等一会就好了**
### 采用 Webpack + 面向对象 + ES6 + loader + plugin
**下面是webpack的配置文件**
```
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
						name: "imgs/[name].[hash:5].[ext]"
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
		new CleanWebpackPlugin(),
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
```
### 注意这是移动端页面。要看移动端的分辨率才能正常观看
**dist就是用webpack打包后的文件夹**
项目查看地址： https://qiheizhiya.github.io/qqMusic/dist/index.html
