
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const host = '0.0.0.0';
const port = '9000';

const config = {
  entry: './demo/src',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/demo/build`,
    filename: 'app.js',
    publicPath: `${__dirname}/demo`,
  },
  module: {
    rules: [
      {
        test: /cropper\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ExtractTextPlugin('cropperjs.css')],
  resolve: {
    alias: {
      'nocms-image-cropper': '../../src',
    },
  },
};

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, './demo'),
  hot: true,
}).listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
});
console.log('-------------------------');
console.log(`Local web server runs at http://${host}: ${port}`);
console.log('-------------------------');

module.exports = config;
