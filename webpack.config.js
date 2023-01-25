const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'thermaljs': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [
			/node_modules/
		],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'thermal.js',
    path: path.resolve(__dirname, 'dist/bundle'),
	globalObject: 'this',
    library: {
      name: 'themaljs',
      type: 'umd',
	  umdNamedDefine: true
    },
  },
  devtool: 'source-map',
  plugins: [/*
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })*/
  ],
};
