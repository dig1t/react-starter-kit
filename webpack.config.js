const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
		path: path.resolve(__dirname, 'public/assets'),
		filename: 'bundle.js'
	},
  module: {
  	rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	optimization: {
		nodeEnv: process.env.NODE_ENV
	}
}