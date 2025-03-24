const webpack = require('webpack');
const path = require('path');

module.exports = {
  transpileDependencies: [],

  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: process.env.API_BASE_URL,
        pathRewrite: { '^/api': '/api' },
        ws: false,
        changeOrigin: true,
      },
    },
  },

  chainWebpack: (config) => {
    const aliases = {
      '@': path.resolve(__dirname, 'src'), 
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'icons': path.resolve(__dirname, 'src/assets/icons'),
      'images': path.resolve(__dirname, 'src/assets/images'),
      'chart.js': path.resolve(__dirname, 'node_modules/chart.js/dist/Chart.js'),
    };

    Object.entries(aliases).forEach(([alias, target]) => {
      config.resolve.alias.set(alias, target);
    });
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/vendor/' : '/',

  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'), 
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'static/images/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendor',
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
};
