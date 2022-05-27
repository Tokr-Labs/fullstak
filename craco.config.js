const {when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES} = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts",
    eslint: {
        configure: (eslintConfig, {env, paths}) => {

            eslintConfig.rules = {
                "no-unused-expressions": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["off"],
                "@typescript-eslint/no-unused-expressions": ["off"]
            };

            return eslintConfig;

        }
    },
    webpack: {
        configure: (webpackConfig, {env, paths}) => {

            webpackConfig.resolve.fallback = {
                "fs": false,
                "tls": false,
                "net": false,
                "path": false,
                "zlib": false,
                "http": false,
                "https": false,
                "stream": false,
                "crypto": false,
                "os": false,
                "crypto-browserify": require.resolve('crypto-browserify'), // if you want to use this module also don't forget npm i crypto-browserify
            }

            return webpackConfig;

        }

    }
};