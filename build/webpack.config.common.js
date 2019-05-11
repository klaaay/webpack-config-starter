const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: "./src/index.js",
	},
	output: {
		// publicPath: "./",
		path: path.resolve(__dirname, "..", "dist"),
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "..", "src"),
		},
	},
	// 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		new webpack.ProvidePlugin({
			$: "jquery", // npm
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/, // 使用正则来匹配 js 文件
				exclude: /node_modules/, // 排除依赖包文件夹
				use: {
					loader: "babel-loader", // 使用 babel-loader
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					// "style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
						},
					},
					"sass-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: [require("autoprefixer")],
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]-[hash:5].min.[ext]",
							limit: 1000, // size <= 1KB
							outputPath: "images/",
						},
					},
					// img-loader for zip img
					{
						loader: "image-webpack-loader",
						options: {
							// 压缩 jpg/jpeg 图片
							mozjpeg: {
								progressive: true,
								quality: 65, // 压缩率
							},
							// 压缩 png 图片
							pngquant: {
								quality: "65-90",
								speed: 4,
							},
						},
					},
				],
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]-[hash:5].min.[ext]",
							limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
							publicPath: "fonts/",
							outputPath: "fonts/",
						},
					},
				],
			},
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	// 打包分块
};
