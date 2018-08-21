'use strict';
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var config = {
  projectName: 'taro-ui-test',
  date: '2018-7-31',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
    }
  },
  defineConstants: {},
  copy: {
    patterns: [
    ],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        url: {
          enable: true,
          limit: 10240
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    },
    webpack: function (config, webpack, opts) {
      config.output = {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-ui-test'
      }
      config.externals = {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      }
      config.plugins.splice(1)
      config.plugins[0] = new MiniCssExtractPlugin({
        filename: 'css/index.css',
        chunkFilename: 'css/[id].css'
      })
      const copySassLoader = {...config.module.rules[1].oneOf[0]}
      copySassLoader.use = [...copySassLoader.use]
      delete copySassLoader.exclude
      copySassLoader.include = [
        path.resolve(__dirname, '..', './.temp/components/theme/index.scss')
      ]
      config.module.rules[1].oneOf.forEach(item => item.use.splice(0, 1, require.resolve('style-loader')))
      config.module.rules[1].oneOf.unshift(copySassLoader)
      return config
    }
  }
};

module.exports = function (merge) {
  if ("development" === 'development') {
    return merge({}, config, require("./dev.js"));
  }
  return merge({}, config, require("./prod.js"));
};
