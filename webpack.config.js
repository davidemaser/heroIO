let webpack = require('webpack');
let HtmlWebPackPlugin = require('html-webpack-plugin');
let path = require('path');
module.exports = {
  entry: './src/app.js',
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
            loader: "css-loader",
            options: {
              alias: {
                "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
              ],
              outputStyle: 'compressed'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [{
          loader: "file-loader"
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(
      {
        template:'assets/templates/main.html',
        inject:'head',
        cache:true,
        hash:true
      }
    ),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery:'jquery'
    })
  ]
};