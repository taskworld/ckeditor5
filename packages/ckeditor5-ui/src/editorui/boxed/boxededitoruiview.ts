/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/editorui/boxed/boxededitoruiview
 */

import EditorUIView from '../editoruiview.js';
import type ViewCollection from '../../viewcollection.js';

import type { Locale } from '@ckeditor/ckeditor5-utils';

/**
 * The boxed editor UI view class. This class represents an editor interface
 * consisting of a toolbar and an editable area, enclosed within a box.
 */
export default abstract class BoxedEditorUIView extends EditorUIView {
	/**
		 * Collection of the child views located in the top (`.ck-editor__top`)
		 * area of the UI.
		 */
	public readonly top: ViewCollection;

	/**
	 * Collection of the child views located in the main (`.ck-editor__main`)
	 * area of the UI.
	 */
	public readonly main: ViewCollection;

	/**
	 * Creates an instance of the boxed editor UI view class.
	 *
	 * @param locale The locale instance..
	 */
	constructor( locale: Locale ) {
		super( locale );

		this.top = this.createCollection();
		this.main = this.createCollection();

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-reset',
					'ck-editor',
					'ck-rounded-corners'
				],
				role: 'application',
				dir: locale.uiLanguageDirection,
				lang: locale.uiLanguage
			},

			children: [
				{
					tag: 'div',
					attributes: {
						class: [
							'ck',
							'ck-editor__top',
							'ck-reset_all'
						],
						role: 'presentation'
					},
					children: this.top
				},
				{
					tag: 'div',
					attributes: {
						class: [
							'ck',
							'ck-editor__main'
						],
						role: 'presentation'
					},
					children: this.main
				}
			]
		} );
	}
}
