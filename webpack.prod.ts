import path from 'path';
import webpack from 'webpack';

import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: Configuration = {
  // Which bundled mode
  mode: 'production',

  // devtool: 'source-map',

  // Where webpack looks to start building the bundle
  entry: path.resolve(__dirname, 'src', 'index.tsx'),

  // Where webpack outputs the assets and bundles
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: './',
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // ================= JavaScript and TypeScript ================
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: 'production',
          },
        },
      },

      // ========================== SASS ===========================
      {
        test: /\.(s(a|c)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // ========================== Images =========================
      {
        test: /\.(png|jpg|jpeg|gif|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },

      // =========================== SVG ===========================
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        exclude: path.resolve(__dirname, 'src/assets/fonts'),
      },

      // ========================== Fonts ==========================
      {
        // test: /fonts.*\.(ttf|otf|eot|woff|woff2|svg)$/i,
        test: /\.(ttf|otf|eot|woff|woff2|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
        include: path.resolve(__dirname, 'src/assets/fonts'),
      },
    ],
  },

  // What file types to look for in which order during module resolution
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  // Customize the webpack build process
  plugins: [
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),

    // Adding type checking into the webpack process
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),

    // Adding linting into the webpack process
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: `[id].[contenthash].css`,
    }),

    // Key to reducing React's size
    new webpack.DefinePlugin({
      /* prettier-ignore */
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),

    // Split bundles into smaller chunks
    new webpack.optimize.AggressiveMergingPlugin(),

    // Compressing versions of assets to serve (gzip)
    new CompressionPlugin({
      filename: 'gzip/[path][base].gz',
      algorithm: 'gzip',
      test: /\.js(\?.*)?$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    // Visualize size of webpack output files
    // new BundleAnalyzerPlugin(),

    // Copies files from target to destination folder
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '**/*',
    //       context: path.resolve(__dirname, 'public'),
    //       to: 'public',
    //     },
    //   ],
    // }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      // Minify / minimize JavaScript
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),

      // Minify / minimize CSS
      new CssMinimizerPlugin({
        test: /.css$/i,
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'node_vendors',
          test: / [\\ /] node_modules [\\ /] /,
          // include all types of chunks
          // https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;
