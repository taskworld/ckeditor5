/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/markdown2html
 */

import marked from 'marked';

// Overrides.
marked.use( {
	tokenizer: {
		// Disable the autolink rule in the lexer.
		autolink: () => null,
		url: () => null,
		paragraph( src ) {
			const x = /^<xbr\/?>/.exec( src );
			if ( x ) {
				// return
				/* console.log( 'zzz' );
				return {
					type: 'br',
					raw: x[ 0 ]
				}; */
			}

			const cap = this.rules.block.paragraph.exec( src );
			if ( cap ) {
				const token = {
					type: 'paragraph',
					raw: cap[ 0 ],
					text: cap[ 1 ].charAt( cap[ 1 ].length - 1 ) === '\n' ?
						cap[ 1 ].slice( 0, -1 ) :
						cap[ 1 ],
					tokens: []
				};
				this.lexer.inline( token.text, token.tokens );
				return token;
			}
		}
	},
	br( src ) {
		console.log( 'br ', JSON.stringify( src ) );

		const cap = this.rules.inline.br.exec( src );
		if ( cap ) {
			return {
				type: 'br',
				raw: cap[ 0 ]
			};
		}
	},
	renderer: {
		checkbox( ...args ) {
			// Remove bogus space after <input type="checkbox"> because it would be preserved
			// by DomConverter as it's next to an inline object.
			return Object.getPrototypeOf( this ).checkbox.call( this, ...args ).trimRight();
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
