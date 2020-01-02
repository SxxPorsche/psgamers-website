/**
 *  公共 Webpack Config
**/

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssGlobalImport = require('postcss-global-import');
const postcssImport = require('postcss-import');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssMediaMinmax = require('postcss-media-minmax');
const postcssCalc = require('postcss-calc');
const postcssNesting = require('postcss-nesting');
const postcssNested = require('postcss-nested');
const postcssSelectorNot = require('postcss-selector-not');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  mode: options.mode,
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                // Transfer @global-import rule by inlining content with :global CSS Modules scope
                // e.g. @global-import 'draft-js/dist/Draft.css'
                // https://github.com/scherebedov/postcss-global-import
                postcssGlobalImport(),
                // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
                // https://github.com/postcss/postcss-import
                postcssImport({ path: 'src' }),
                postcssCustomProperties(),
                // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
                // https://github.com/postcss/postcss-media-minmax
                postcssMediaMinmax(),
                // W3C calc() function, e.g. div { height: calc(100px - 2em); }
                // https://github.com/postcss/postcss-calc
                postcssCalc(),
                // Allows you to nest one style rule inside another
                // https://github.com/jonathantneal/postcss-nesting
                postcssNesting(),
                // Unwraps nested rules like how Sass does it
                // https://github.com/postcss/postcss-nested
                postcssNested,
                // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
                // https://github.com/postcss/postcss-selector-not
                postcssSelectorNot(),
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                autoprefixer(/* package.json/browserslist */),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    // asserts sources
    new CopyWebpackPlugin([
      'public/favicon.ico',
      'public/manifest.json',
      'public/robots.txt',
    ].map((src) => ({ from: src, to: path.resolve(process.cwd(), 'build') }))),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
    // only load locale we need
    // https://github.com/moment/moment/issues/2517#issuecomment-185836313
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh/),
  ]),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      // zh-cn.js will import '../moment', since we are using jsnext:main, it will pack two copys of moment.
      'moment$': path.resolve('node_modules/moment/moment'),
    }
  },
  stats: {
    errors: true,
    children: false,
    warnings: true,
  },
  target: 'web',
  performance: options.performance,
});
