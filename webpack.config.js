const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

// This is my main configuration object.
// Here I write different options and tell Webpack what to do
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', 'scss'],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  // Path to the entry point. From this file Webpack will begin his work.
  entry: ['@babel/polyfill', './main.jsx'],

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things on the final bundle.
  //  Things like minimizing JS.
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js(x?)+/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // Makes the bundle file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader'
          },
          {
            // This transforms SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          }
        ],
        sideEffects: true
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            // Using file-loader for these files
            loader: 'file-loader',

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: 'images'
            }
          }
        ]
      },
      {
        // Now we apply rule for 3D objects
        test: /\.(gltf|fbx|glb)$/,
        use: [
          {
            // Using file-loader for these files
            loader: 'file-loader',

            // In options we can set different things like format
            // and directory to save
            options: {
              outputPath: '3d-assets'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'svg-inline-loader',
          options: {
            outputPath: 'svg'
          }
        }]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
              mimetype: 'application/font-[ext]'
            }
          }
        ]
      }
    ]

  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.png')
    })
  ]
}
