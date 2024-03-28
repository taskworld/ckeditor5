/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor as ClassicEditorBase } from '../../ckeditor5-editor-classic/src/index.js';

import { Autoformat } from '../../ckeditor5-autoformat/src/index.js';
import { BlockQuote } from '../../ckeditor5-block-quote/src/index.js';
import { CodeBlock } from '../../ckeditor5-code-block/src/index.js';
import { Essentials } from '../../ckeditor5-essentials/src/index.js';
import { Heading } from '../../ckeditor5-heading/src/index.js';
import { HorizontalLine } from '../../ckeditor5-horizontal-line/src/index.js';
import { Indent } from '../../ckeditor5-indent/src/index.js';
import { AutoLink, Link } from '../../ckeditor5-link/src/index.js';
import { List } from '../../ckeditor5-list/src/index.js';
import { Paragraph } from '../../ckeditor5-paragraph/src/index.js';
import { RemoveFormat } from '../../ckeditor5-remove-format/src/index.js';
import { Bold, Code, Italic, Strikethrough, Underline } from '../../ckeditor5-basic-styles/src/index.js';
import { Markdown } from '../../ckeditor5-markdown-gfm/src/index.js';
import MarkdownGuide from './markdownguide.js';
import { Mention } from '../../ckeditor5-mention/src/index.js';
import { Image, ImageUpload, ImageStyle, ImageToolbar, AutoImage } from '../../ckeditor5-image/src/index.js';

export default class ClassicEditor extends ClassicEditorBase { }

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Autoformat,
	AutoLink,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	Heading,
	HorizontalLine,
	Italic,
	Image,
	ImageUpload,
	ImageStyle,
	ImageToolbar,
	AutoImage,
	Indent,
	Link,
	List,
	Markdown,
	MarkdownGuide,
	Mention,
	Paragraph,
	RemoveFormat,
	Strikethrough,
	Underline
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'link'
		]
	}
};
