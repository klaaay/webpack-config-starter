const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin"); // 引入 PWA 插件

const commonConfig = require("./webpack.config.common.js");

// css - tree shaking
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");

const prodConfig = {
	mode: "production",
	devtool: "cheap-module-source-map",
	output: {
		publicPath: "./",
		filename: "[name].[contenthash].js",
		chunkFilename: "[name].[contenthash].js",
	},
	// 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "自动生成 HTML",
			minify: {
				// 压缩html文件
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
			},
			filename: "index.html",
			template: path.resolve(__dirname, "index.html"),
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
			cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
			canPrint: true, //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
		}),
		// 清除无用 css
		new PurifyCSS({
			paths: glob.sync([
				// 要做 CSS Tree Shaking 的路径文件
				path.resolve(__dirname, "./*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
				path.resolve(__dirname, "./src/*.js"),
			]),
		}),
		// 配置 PWA
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
	],
	// 打包分块
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				lodash: {
					name: "lodash-es",
					test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
					priority: 10,
				},
				commons: {
					name: "commons",
					minSize: 0, // 表示在压缩前的最小模块大小，默认值是30kb
					minChunks: 2, // 最小公用次数
					priority: 5, // 优先级
					reuseExistingChunk: true, // 公共模块必开启
				},
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
};

module.exports = merge(commonConfig, prodConfig);
