import path from 'path';
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
} from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  // Which bundled mode
  mode: 'development',

  // Where webpack looks to start building the bundle
  entry: path.resolve(__dirname, 'src/index.tsx'),

  // Where webpack outputs the assets and bundles
  output: {
    publicPath: '',
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
            envName: 'development',
          },
        },
      },

      // ======================= Module SASS =======================
      {
        test: /\.(s(a|c)ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: '[local]__[hash:base64:6]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: /\.module\.(s(a|c)ss)$/i,
      },

      // ========================== SASS ===========================
      {
        test: /\.(s(a|c)ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /\.module\.(s(a|c)ss)$/i,
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
      template: path.resolve(__dirname, 'public/index.html'),
    }),

    // Only update what has changed on hot reload
    new HotModuleReplacementPlugin(),

    // Adding type checking into the webpack process
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),

    // Adding linting into the webpack process
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),

    // Copies files from target to destination folder
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '**/*',
    //       context: path.resolve(__dirname, 'src', 'assets'),
    //       to: 'assets',
    //     },
    //   ],
    // }),
  ],

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 4200,
    open: true,
    hot: true,
  },
};

export default config;
