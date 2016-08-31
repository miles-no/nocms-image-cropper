
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var host = '0.0.0.0';
var port = '9000';

var config = {
  entry: './demo/src',
  devtool: 'source-map',
  output: {
    path: __dirname + '/demo/build',
    filename: 'app.js',
    publicPath: __dirname + '/demo'
  },
  module: {
    loaders: [
      {
        test: /cropper\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('cropperjs.css')
  ],
  resolve: {
    alias: {
      'nocms-image-cropper': '../../src'
    },
  },
};

new WebpackDevServer(webpack(config), {
  contentBase: './demo',
  hot: true,
  debug: true
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }
});
console.log('-------------------------');
console.log('Local web server runs at http://' + host + ':' + port);
console.log('-------------------------');

module.exports = config;
