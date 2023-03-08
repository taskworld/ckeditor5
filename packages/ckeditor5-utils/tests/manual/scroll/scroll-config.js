/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global document, setTimeout */

import { scrollViewportToShowTarget } from '../../../src/dom/scroll';

document.getElementById( 'navigation' ).addEventListener( 'click', evt => {
	if ( evt.target.nodeName == 'BUTTON' ) {
		const target = document.getElementById( evt.target.dataset.scrollTo );
		scrollViewportToShowTarget( {
			target,
			...getConfig()
		} );

		target.classList.add( 'highlight' );

		setTimeout( () => {
			target.classList.remove( 'highlight' );
		}, 200 );
	}
}, { useCapture: true } );

function getConfig() {
	return {
		viewportOffset: parseInt( document.getElementById( 'viewportOffset' ).value ),
		ancestorOffset: parseInt( document.getElementById( 'ancestorOffset' ).value ),
		alignToTop: document.getElementById( 'alignToTop' ).checked
	};
}
