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
		/* paragraph( src ) {
			// console.log( 'm2h tok p src=', JSON.stringify( src ) );
			const cap = this.rules.block.paragraph.exec( src );
			if ( cap ) {
				// console.log( 'm2h tok p cap=', JSON.stringify( cap ) );
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
		} */
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
