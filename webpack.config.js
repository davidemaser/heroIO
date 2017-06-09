let webpack = require('webpack');
let HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/app.js",
  watch:true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module:{
    rules:[
      {
        test: /\.scss$/,
        use:[
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["css/scss","css/styles"],
              outputStyle: 'compressed'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(
      {
        inject:'head',
        cache:true,
        hash:true
      }
    ),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery' })
  ]
};