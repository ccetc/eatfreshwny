import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ScriptPlugin from '../lib/webpack/script_plugin'
import StylePlugin from '../lib/webpack/style_plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import path from 'path'

const config = {
  entry: [
    path.resolve('tmp', 'index.js'),
    path.resolve('tmp', 'index.less')
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          { loader: 'postcss-loader', options: {
            plugins: [autoprefixer, cssnano] }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0' ]
        }
      }
    ]
  },
  mode: 'production',
  output: {
    path: path.resolve('public'),
    filename: path.join('js', 'bundle-[hash].min.js'),
    publicPath: '/'
  },
  plugins: [
    new ScriptPlugin(),
    new StylePlugin(),
    new MiniCssExtractPlugin({
      path: path.resolve('public'),
      filename: path.join('css', 'bundle-[hash].min.css'),
      publicPath: '/'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'app','index.html')
    })
  ]
}

export default config
