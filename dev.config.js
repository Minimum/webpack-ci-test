const fs = require('fs');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const environmentFilename = "environment.json";
const sourcePath = "src";
const buildPath = "build";
const entryFilename = "entry.js";
const scriptFilename = "app-bundle.js";
const styleFilename = "app-bundle.css";

// Resources larger than 20KB won't be bundled
const resourceSizeLimit = 20 * 1024;

module.exports = env =>
{
    var appEntry = { };
    var envFile = fs.readFileSync(environmentFilename, 'utf8');
    var envData = JSON.parse(envFile);

    for(var i = 0; i < envData.projects.length; i++)
    {
        appEntry[envData.projects[i].path] = `./${sourcePath}/${envData.projects[i].path}/${entryFilename}`;
    }

    var exportObj =
    {
        entry: appEntry,
        mode: "development",
        output:
        {
            path: path.resolve(__dirname, buildPath),
            filename: `[name]/dist/${scriptFilename}`
        },
        optimization:
        {
            minimizer:
            [
                new TerserJSPlugin({}),
                new CssMinimizerPlugin({})
            ]
        },
        plugins:
        [
            new MiniCssExtractPlugin
            ({
                filename: `[name]/dist/${styleFilename}`
            })
        ],
        module:
        {
            rules:
            [
                {
                    test: /\.(css)$/i,
                    use:
                    [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|gif|jpg|jpeg|ttf|woff2|woff|eot)$/i,
                    loader: 'url-loader',
                    options:
                    {
                        limit: resourceSizeLimit
                    }
                },
                {
                    test: /\.(svg)$/i,
                    loader: 'svg-url-loader',
                    options:
                    {
                        limit: resourceSizeLimit
                    }
                }
            ]
        }
    };

    return exportObj;
};
