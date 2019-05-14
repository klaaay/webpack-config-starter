const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = require("./webpack.config.common.js");

const devConfig = {
	mode: "development",
	devtool: "source-map", // 开启调试
	output: {
		publicPath: "/",
		filename: "[name].bundle.js",
		chunkFilename: "[name].js",
	},
	// 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产
	plugins: [
		new HtmlWebpackPlugin({
			title: "自动生成 HTML",
			filename: "index.html",
			template: path.resolve(__dirname, "index.html"),
		}),
		new webpack.HotModuleReplacementPlugin(), // 热部署模块
		new webpack.NamedModulesPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, "..", "public"),
		port: 8000, // 本地服务器端口号
		hot: true, // 热重载
		overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
		proxy: {
			// 跨域代理转发
			"/comments": {
				target: "https://m.weibo.cn",
				changeOrigin: true,
				logLevel: "debug",
				headers: {
					Cookie: "",
				},
			},
		},
		historyApiFallback: {
			// HTML5 history模式
			// 当项目使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
			// 在 SPA（单页应用）中，任何响应直接被替代为 index.html。
			rewrites: [{ from: /.*/, to: "/index.html" }],
		},
	},
};

module.exports = merge(commonConfig, devConfig);
