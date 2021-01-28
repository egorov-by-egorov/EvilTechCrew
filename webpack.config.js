const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV = process.env.ENV || 'development';
const isDev = ENV === 'development';

const styleLoaders = [
    ...(isDev ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
    'css-loader',
    'postcss-loader',
    'sass-loader',
];

const publicPath = '/';

module.exports = {
    mode: ENV,
    entry: './src/entries/root.tsx',
    output: {
        path: path.resolve(__dirname, './out/'),
        publicPath,
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js',
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
        modules: ['node_modules', path.resolve(__dirname, './src')],
    },
    optimization: {
        minimize: !isDev,
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.s?css$/,
                use: styleLoaders,
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static',
                            publicPath: '/static',
                        },
                    },
                ],
            },
            {
                test: /\.(woff2|woff|ttf|eot)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static',
                            publicPath: '/static',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Admin',
            inject: true,
            scriptLoading: 'defer',
            template: './resources/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, './out/'),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 3000,
    },
};
