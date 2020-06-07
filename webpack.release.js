const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
    return {
        entry: {
            love: './src/love.ts',
            'love.min': './src/love.ts'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/release'
        },
        devServer: {
            disableHostCheck: true
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{loader: 'ts-loader'}]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: ['node_modules', 'src'],
            symlinks: false
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.min\.js$/,
                    minify(file, sourceMap) {
                        const extractedComments = []
                        const {error, map, code, warnings} = require('uglify-js').minify(file, {
                            warnings: false,
                            compress: {
                                sequences: true,
                                dead_code: true,
                                conditionals: true,
                                booleans: true,
                                unused: true,
                                if_return: true,
                                join_vars: true,
                                drop_console: true
                            },
                            toplevel: false,
                            ie8: false,
                            keep_fnames: false
                        })

                        return {error, map, code, warnings, extractedComments}
                    }
                })
            ]
        },
        plugins: [new CopyWebpackPlugin([{from: 'assets', to: 'assets'}])]
    }
}
