'use strict'
const utils = require('./utils')
const config = require('../config')
const px2rem = require('postcss-plugin-px2rem')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
	config.build.productionSourceMap :
	config.dev.cssSourceMap

module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: sourceMapEnabled,
		extract: isProduction
	}),
	cssSourceMap: sourceMapEnabled,
	cacheBusting: config.dev.cacheBusting,
	transformToRequire: {
		video: ['src', 'poster'],
		source: 'src',
		img: 'src',
		image: 'xlink:href'
	},

	postcss: {
		plugins: [
			require('postcss-plugin-px2rem')({ //配置项，详见官方文档
				rootValue: 10
			}), // 换算的基数
		]
	}
}
