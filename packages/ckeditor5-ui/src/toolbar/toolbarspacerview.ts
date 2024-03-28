/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import View from '../view.js';

/**
 * The toolbar spacer view class.
 *
 * @extends module:ui/view~View
 */
export default class ToolbarSpacerView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( ) {
		super( );

		this.setTemplate( {
			tag: 'span',
			attributes: {
				class: [
					'ck',
					'ck-toolbar__spacer'
				]
			}
		} );
	}
}
