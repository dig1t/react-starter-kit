const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, 'src', 'client.js'),
	output: {
		path: path.join(__dirname, 'dist/public'),
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
	}
}