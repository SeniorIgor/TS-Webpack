import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniSVGDataURI from 'mini-svg-data-uri';

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
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
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

      // =========================== SVG ===========================
      {
        test: /\.svg$/i,
        type: 'asset/inline',
        exclude: path.resolve(__dirname, 'src/assets/fonts'),
        generator: {
          dataUrl(content: string | Buffer): string {
            const newContent = content.toString();
            return MiniSVGDataURI(newContent);
          },
        },
        use: 'svgo-loader',
      },

      // ========================== Images =========================
      {
        test: /\.(png|jpg|jpeg|gif|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },

      // ========================== Fonts ==========================
      {
        test: /\.(ttf|otf|eot|woff|woff2|svg)$/i,
        type: 'asset/resource',
        include: path.resolve(__dirname, 'src/assets/fonts'),
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  // What file types to look for in which order during module resolution
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: 'assets',
        },
      ],
    }),
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
