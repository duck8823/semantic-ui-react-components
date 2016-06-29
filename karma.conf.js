var path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['phantomjs-shim','mocha'],
		files: [
			'path/to/test/**/*.spec.js'
		],
		exclude: [
		],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-phantomjs-shim',
			'karma-mocha',
			'karma-sourcemap-loader',
			'karma-webpack',
			'karma-coverage',
			'karma-mocha-reporter'
		],
		preprocessors: {
			'path/to/test/**/*.spec.js': ['webpack', "sourcemap"]
		},
		webpack: {
			devtools: 'inline-source-map',
			isparta: {
				embedSource: true,
				noAutoWrap: true
			},
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel'
					},
					{
						test: /\.css(\?.+)?$/,
						loader: 'style!css'
					}
				],
				preLoaders: [
					{
						test: /\.jsx?$/,
						exclude: [
							path.resolve('path/to/test/'),
							path.resolve('node_modules/')
						],
						loader: 'isparta'
					}
				]
			}
		},
		webpackMiddleware: {
			noInfo: true
		},
		port: 9876,
		browsers: ['PhantomJS'],
		reporters: ['mocha', 'coverage'],
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true,
		concurrency: Infinity,
		coverageReporter: {
			dir: 'path/to/test/report/',
			reporters: [
				{ type: 'text' },
				{ type: 'html', subdir: '.' }
			]
		}
	})
};