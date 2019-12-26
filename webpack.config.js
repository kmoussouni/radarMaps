var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    // .setManifestKeyPrefix('build/')

    .addStyleEntry('css/app.min', './assets/scss/app.scss')
    .addEntry('js/app.min', './assets/js/App.js')
    // .addEntry('js/resume.min', './assets/js/resume.js')

    // .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps()
    // .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabel(() => {}, {
        useBuiltIns: 'usage',
        corejs: 3
    })

    // .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // .configureLoaderRule(
    //     'js', loaderRule =>
    //         {
    //             loaderRule.test = /\.asc$/, // assemblyscript Source File
    //             loaderRule.exclude = "/node_modules/"
    //             // loaderRule.loader = "assemblyscript-live-loader"
    //         }
    // )
    .addPlugin(new CopyWebpackPlugin([
        { from: './assets/img', to: 'img' },
    ]))
    .enableReactPreset()
    .enableSassLoader()
    //.enableTypeScriptLoader()
    //.enableIntegrityHashes(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();
