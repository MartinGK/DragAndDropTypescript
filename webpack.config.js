const path = require('path');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const options = { 
    host: '127.0.0.1',
    port: 3000
};

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    devServer: {
        port: 3000,
        host: '127.0.0.1'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new Serve(options)
    ]
};