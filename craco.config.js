const {when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES} = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts",
    eslint: {
        configure: (eslintConfig, {env, paths}) => {

            eslintConfig.rules = {
                "no-unused-expressions": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["off"],
                "@typescript-eslint/no-unused-expressions": ["off"],
                "@typescript-eslint/no-non-null-assertion": ["off"]
            };

            return eslintConfig;

        }
    },
    webpack: {
        configure: (webpackConfig, {env, paths}) => {


            webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
                if (rule.oneOf instanceof Array) {
                    rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
                }
                return rule;
            });

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

    },
    jest: {
        babel: {
            addPresets: true,
            addPlugins: true
        },
        configure: (jestConfig, {env, paths, resolve, rootDir}) => {
            jestConfig.roots = ["."];
            return jestConfig;
        }
    },
};