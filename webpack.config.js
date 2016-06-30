var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: './path/to/src/entry.js'
	},
	output: {
		path: path.join(__dirname, 'path/to/dist'),
		filename: 'bundle.js'
	},
	plugins: [
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
				test : /\.(svg|woff2?|eot|ttf|png|gif)$/,
				loader: 'url'
			}
		]
	}
};