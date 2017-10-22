const webpack = require('webpack')
const path = require('path')

const ENV = JSON.stringify(process.env.NODE_ENV || 'development')

module.exports = {
	devServer: {
		inline: true,
		contentBase: './',
		port: 3000
	},
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
		path: path.resolve(__dirname, 'public/compiled'),
		filename: ENV === 'production' ? 'bundle.min.js' : 'bundle.js'
	},
  module: {
    loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: ENV === 'production' ? [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': ENV
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			}
		})
	] : []
}