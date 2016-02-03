var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'devtool':'./src/devtool',
    'background':'./src/background',
    'contentscript':'./src/contentscript',
    'injectedscript':'file?name=[name].[ext]!./src/injectedscript.txt',
    'panel':'./src/panel',
    'manifest':'file?name=[name].[ext]!./src/manifest.json'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },{
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  }
};
