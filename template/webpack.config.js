var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        postcss: [require('postcss-cssnext')({
          features: {
            rem: false
          }
        }), require('postcss-pxtorem')({
          rootValue: 20,
          propWhiteList: []
        })]
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    port: 8080
  },
  performance: {
    hints: false
  },
  devtool: '#cheap-module-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = './dist/';
  module.exports.output.filename = 'build.[hash].js';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './build/temp/index.html'
    })
  ])
}