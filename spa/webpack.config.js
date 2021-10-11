// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProd = env.prod;
	const mode = isProd ? 'production' : 'development';
	console.log(
		`bundling with environment ${isProd ? 'Prod' : 'Dev'} & mode ${mode}`,
	);

	return {
		mode: mode,
		entry: ['./src/main.tsx', './src/css/main.less'],

		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},

		output: {
			path: path.resolve(__dirname, '../dist/public'),
			filename: 'spa-main.js',
		},

		devtool: isProd ? undefined : 'inline-source-map',

		devServer: {
			open: true,
			host: 'localhost',
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: 'index.html',
				inject: false,
			}),

			// export css into css file
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: 'spa-screen.css',
			}),
		],
		module: {
			rules: [
				{
					test: /\.(tsx|ts)?$/,
					loader: 'ts-loader',
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(jsx|js)$/,
					include: path.resolve(__dirname, 'src'),
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											targets: {
												chrome: 80,
											},
										},
									],
									'@babel/preset-react',
								],
							},
						},
					],
				},

				// less loader
				{
					test: /\.less$/,
					exclude: /node_modules/,
					// export into css file instead of inject inline html
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
				},
			],
		},
	};
};
