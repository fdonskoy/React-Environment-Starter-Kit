var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: { //this is the entry file
    app: './src/js/components/index.js', //location of the file
    vendor: ['react', 'react-dom'] //names of libraries you're using with your js
  },
  output: {
    filename: '[name].js', //outputted file will be named according to entry variable
    path: path.resolve(__dirname, 'public/js/components')
  },
  module: {
    rules: [
      {
        test: /\.js$/, //any file that ends with js
        exclude: /node_modules/, //excude node modules
        loader: 'babel-loader', //use a babel-loader to convert es6 to vanilla js
        options: {
          presets: [
            [ 'es2015', { modules: false } ]
          ]
        }
      }
    ]
  },
  plugins: [
            new webpack.optimize.CommonsChunkPlugin({ //
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
            //further optimize
            //         new webpack.optimize.UglifyJsPlugin({
            //   sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
            // }),
            // new webpack.Define
                    // new webpack.optimize.CommonsChunkPlugin({
                    //     name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
                    // })
          ]
}
