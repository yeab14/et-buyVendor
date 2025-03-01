const path = require('path');
const webpack = require('webpack');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
  lintOnSave: false,
  configureWebpack: {
   
    resolve: {
      alias: {
        src: resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Light Bootstrap Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  css: {
   
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    port: 9000, 
    open: true,  
  }
};
