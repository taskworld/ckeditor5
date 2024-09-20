/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const { CKEditorTranslationsPlugin } = require( '@ckeditor/ckeditor5-dev-translations' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	// Expose Editor class and its React wrapper component
	entry: path.resolve( __dirname, 'src', 'index.ts' ),

	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
		library: {
			type: 'commonjs-module',
			export: 'default'
		}
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	// Exclude React from the output bundle
	externals: /^react(-|$)/,

	plugins: [
		new CKEditorTranslationsPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig( {
								themeImporter: {
									// Use Taskworld theme
									themePath: require.resolve( '../ckeditor5-theme-lark/theme/theme.css' )
								},
								minify: true
							} )
						}
					}
				]
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'esbuild-loader',
						options: { tsconfig: 'tsconfig.json' }
					}
				]
			}
		]
	},

	resolve: {
		extensions: [ '.ts', '.js', '.json' ],
		extensionAlias: {
			'.js': [ '.js', '.ts' ]
		}
	}
};
