module.exports = {
	entry: "./app/js/index.js",
	output: {
		path: __dirname + "/dist/js",
		filename: "bundle.js"
	},
	module: {
		loaders: [
		  	{test : /\.css$/, loader : "style-loader!css-loader"},
		  	{
			    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			    loader: 'url-loader',
			    options: {
			        limit: 4096, // 小于2kb的图片处理成base64
			        name: '../img/[name].[ext]',
			        publicPath:"./dist/"
			    }
			}
		]
	}
}