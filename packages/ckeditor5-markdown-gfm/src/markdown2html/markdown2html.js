/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module markdown-gfm/markdown2html
 */

import { marked } from 'marked';

// Modified from https://github.com/markedjs/marked/issues/2328
// See https://marked.js.org/using_pro#extensions
const underline = {
	name: 'underline',
	level: 'inline',
	start( src ) {
		const match = src.match( /\+\+[^+\n]/ );
		if ( match ) {
			return match.index;
		}
	},
	tokenizer( src ) {
		const rule = /^(\+\+)(?=[^\s+])([\s\S]*?[^\s+])\1(?=[^+]|$)/;
		const match = rule.exec( src );
		if ( match ) {
			const token = {
				type: 'underline',
				raw: match[ 0 ],
				text: match[ 2 ],
				tokens: this.lexer.inlineTokens( match[ 2 ] )
			};
			return token;
		}
	},
	renderer( token ) {
		return `<u>${ this.parser.parseInline( token.tokens ) }</u>`;
	}
};

// Overrides.
marked.use( {
	extensions: [ underline ],
	tokenizer: {
		// Disable the autolink rule in the lexer.
		autolink: () => null,
		url: () => null
	},
	renderer: {
		checkbox( ...args ) {
			// Remove bogus space after <input type="checkbox"> because it would be preserved
			// by DomConverter as it's next to an inline object.
			return Object.getPrototypeOf( this ).checkbox.call( this, ...args ).trimRight();
		},

		code( ...args ) {
			// Since marked v1.2.8, every <code> gets a trailing "\n" whether it originally
			// ended with one or not (see https://github.com/markedjs/marked/issues/1884 to learn why).
			// This results in a redundant soft break in the model when loaded into the editor, which
			// is best prevented at this stage. See https://github.com/ckeditor/ckeditor5/issues/11124.
			return Object.getPrototypeOf( this ).code.call( this, ...args ).replace( '\n</code>', '</code>' );
		}
	}
} );

/**
 * Parses markdown string to an HTML.
 *
 * @param {String} markdown
 * @returns {String}
 */
export default function markdown2html( markdown ) {
	return marked.parse( markdown, {
		gfm: true,
		breaks: true,
		tables: true,
		xhtml: true,
		headerIds: false
	} );
}

export { marked };
