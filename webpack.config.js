const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/js/index',
        './src/scss/index.scss'
    ],

    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/app.js',
        publicPath: './'
    },

    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        port: 3000
    },

    devtool: 'cheap-eval-source-map', // remove for build

    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/'),
                use: ['raw-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                include: [/fonts/],
          
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                  publicPath: url => '../fonts/' + url
                }
              },
        ]
    },
    plugins: [        
        new ExtractTextPlugin({
            filename: 'css/app.css',
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/img',
                to: './img'
            },
        ])
    ]
};