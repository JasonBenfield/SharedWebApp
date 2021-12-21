const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: '@xti/libproducer',
            type: 'commonjs',
        },
    },
    module: {
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
                        },
                        esModule: false
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
    }
};