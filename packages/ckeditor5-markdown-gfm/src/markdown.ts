/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module markdown-gfm/markdown
 */

import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import GFMDataProcessor from './gfmdataprocessor.js';

// eslint-disable-next-line ckeditor5-rules/no-relative-imports
import '../../ckeditor5-mention/src/index.js';

/**
 * The GitHub Flavored Markdown (GFM) plugin.
 *
 * For a detailed overview, check the {@glink features/markdown Markdown feature} guide.
 */
export default class Markdown extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor: Editor ) {
		super( editor );

		// Do not write `get('mention.idToText')` as it does NOT return a resolver function
		const mentionIdToText = editor.config.get( 'mention' )?.idToText;

		editor.data.processor = new GFMDataProcessor( editor.data.viewDocument, mentionIdToText );
	}

	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'Markdown' as const;
	}
}
