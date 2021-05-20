const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://apitest.akatsuki.com.cn',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
        secure: true
      }
    }
  },
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      '@': resolve('src'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components'),
      'common': resolve('src/common'),
      'config': resolve('src/config'),
      'router': resolve('src/router'),
      'store': resolve('src/store'),
      'icon': resolve('assets/icon'),
      'api': resolve('src/config/api'),
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader' },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url-loader' },
      { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
      { test: /\.less$/, use: [ "style-loader", "css-loader", "less-loader" ] },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.(html|tpl)$/, loader: "html-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public/**/*',
        to: path.join(__dirname, 'dist/[name][ext]'),
      }]
    }),
    new VueLoaderPlugin()
  ]
}