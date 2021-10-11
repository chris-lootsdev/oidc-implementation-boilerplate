// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
	const isProd = env.prod;
	const mode = isProd ? 'production' : 'development';
	console.log(
		`bundling with environment ${isProd ? 'Prod' : 'Dev'} & mode ${mode}`,
	);

	return {
		devtool: !isProd ? 'source-map' : undefined,
		externals: [nodeExternals()],
		target: 'node',
		entry: './src/app.ts',
		mode: mode,
		resolve: {
			extensions: ['.ts', '.js'],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'app.bundle.js',
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: 'ts-loader',
				},
			],
		},
	};
};
