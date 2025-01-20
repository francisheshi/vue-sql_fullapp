import { VueLoaderPlugin } from 'vue-loader'

export default module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
        },
      },
    ],
  },
}

export const plugins = [new VueLoaderPlugin()]
