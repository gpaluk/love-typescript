var path = require('path')
var webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
    return {
        entry: path.resolve(__dirname, './src/love.tsx'),
        output: {
            filename: 'love.js',
            path: __dirname + '/dev'
        },
        devServer: {
            disableHostCheck: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{loader: 'ts-loader'}]
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            modules: ['node_modules', 'src'],
            symlinks: false
        },
        devtool: 'source-map',
        plugins: [new CopyWebpackPlugin([{from: './src/css/', to: './css/'}])]
    }
}
