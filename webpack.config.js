const path = require('path');

const config = {
    entry: './client/src/App.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.jpg$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath(url) {
                    return url.replace('../', '/assets/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
    },
    loaders: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ],
      
    // plugins: ['import-graphql'],

    mode: 'development'
};

module.exports = config;