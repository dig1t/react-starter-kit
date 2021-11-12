const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	externalsPresets: { node: true },
	externals: [ nodeExternals() ],
	//devtool: 'source-map',
	entry: path.resolve(__dirname, 'server', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'server.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(ejs)$/,
				exclude: /node_modules/,
				use: ['ejs-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '!!raw-loader!./server/views/template.ejs',
			filename: 'views/template.ejs'
		})
	]
}