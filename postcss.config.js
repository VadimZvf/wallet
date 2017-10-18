module.exports = {
    /* eslint-disable global-require */
    plugins: [
        require('postcss-import'), // Plugin to transform @import rules by inlining content
        require('postcss-nested'), // Plugin to unwrap nested rules like how Sass does it
        require('autoprefixer') // Add vendor prefixes to CSS rules using values from caniuse.com
    ]
    /* eslint-enable global-require */
};
