var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	resolve: {
		alias : {
			semantic : 'semantic-ui-css/semantic'
		}
	},
	entry: {
		bundle: './path/to/src/entry.js'
	},
	output: {
		path: path.join(__dirname, 'path/to/dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"windows.jQuery" : "jquery"
		}),
		new ExtractTextPlugin('bundle.css')
	],
	module : {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css(\?.+)?$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test : /\.svg$/,
				loader: 'url?mimetype=image/svg+xml'
			},
			{
				test : /\.woff$/,
				loader: 'url?mimetype=application/font-woff'
			},
			{
				test : /\.woff2$/,
				loader: 'url?mimetype=application/font-woff'
			},
			{
				test : /\.eot$/,
				loader: 'url?mimetype=application/font-woff'
			},
			{
				test : /\.ttf$/,
				loader: 'url?mimetype=application/font-woff'
			},
			{
				test : /\.png$/,
				loader: 'url?mimetype=image/png!file?name=images/[name].[ext]'
			},
			{
				test : /\.gif$/,
				loader: 'url?mimetype=image/gif!file?name=images/[name].[ext]'
			}
		]
	}
};