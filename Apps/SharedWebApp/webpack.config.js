﻿const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entry = {
    user: './Scripts/Shared/User/UserPage.ts',
    home: './Scripts/Internal/Home/MainPage.ts',
    employee: './Scripts/Internal/Employee/MainPage.ts'
};
const exportModule = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '../../styles/css/[name].css',
                    },
                },
                'resolve-url-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.css$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: (resourcePath, resourceQuery) => {
                                if (/@fortawesome[\\\/]fontawesome-free/.test(resourcePath)) {
                                    return '../../styles/css/fontawesome/[name].css';
                                }
                                return '../../styles/css/[name].css';
                            }
                    }
                }
            ]
        },
        {
            test: /\.html$/i,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: {
                        removeComments: false
                    }
                }
            }]
        },
        {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../../styles/css/webfonts'
                }
            }]
        }
    ]
};
const outputFilename = '[name].js';
//    (pathData) => {
//        var cache = [];
//        let json = JSON.stringify(pathData, (key, value) => {
//            if (typeof value === 'object' && value !== null) {
//                // Duplicate reference found, discard key
//                if (cache.includes(value)) return;

//                // Store value in our collection
//                cache.push(value);
//            }
//            return value;
//        });
//        console.log('pathData:\r\n' + json);
//        return pathData.chunk.name;
//};
const resolve = {
    alias: {
        xtistart: path.resolve(__dirname, 'Scripts/Internal/Startup.js')
    }
};
const plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
];
module.exports = [
    {
        mode: 'production',
        entry: entry,
        module: exportModule,
        plugins: plugins,
        output: {
            filename: outputFilename,
            path: path.resolve(__dirname, 'wwwroot', 'js', 'dist')
        },
        resolve: resolve
    },
    {
        mode: 'development',
        entry: entry,
        module: exportModule,
        plugins: plugins,
        output: {
            filename: outputFilename,
            path: path.resolve(__dirname, 'wwwroot', 'js', 'dev')
        },
        resolve: resolve
    }
];