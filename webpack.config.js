/**
 * Created by DAVIM on 25/04/2017.
 */
var path = require('path');

module.exports = {
    entry: './preflight/app4.0.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};