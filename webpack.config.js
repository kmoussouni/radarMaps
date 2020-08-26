var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    //.setManifestKeyPrefix('build/')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .enableSassLoader()

    .addLoader({ test: /\.tsx$/, loader: 'ts-loader' })
    .enableTypeScriptLoader(function(tsConfig) {
        // You can use this callback function to adjust ts-loader settings
        // https://github.com/TypeStrong/ts-loader/blob/master/README.md#loader-options
        // For example:
        // tsConfig.silent = false
        // configFile "./tsconfig.json",
        // tsConfig.options = { allowTsInNodeModules: true }
    })
    // .enableForkedTypeScriptTypesChecking()
    // .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // .addPlugin({
    //     test: /\.tsx?$/,
    //     loader: 'ts-loader?' + JSON.stringify({
    //         transpileOnly: true
    //     }) })
    .enableReactPreset()

    .addEntry('js/App.min', './assets/js/App.js')
    .addStyleEntry('css/App.min', './assets/scss/App.scss')
;

module.exports = Encore.getWebpackConfig();
