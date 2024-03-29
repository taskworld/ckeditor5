/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor as ClassicEditorBase } from '../../ckeditor5-editor-classic/src/index.js';

import { Autoformat } from '../../ckeditor5-autoformat/src/index';
import { BlockQuote } from '../../ckeditor5-block-quote/src/index';
import { CodeBlock } from '../../ckeditor5-code-block/src/index';
import { Essentials } from '../../ckeditor5-essentials/src/index';
import { Heading } from '../../ckeditor5-heading/src/index';
import { HorizontalLine } from '../../ckeditor5-horizontal-line/src/index';
import { Indent } from '../../ckeditor5-indent/src/index';
import { AutoLink, Link, type LinkConfig } from '../../ckeditor5-link/src/index';
import { List } from '../../ckeditor5-list/src/index';
import { Paragraph } from '../../ckeditor5-paragraph/src/index';
import { RemoveFormat } from '../../ckeditor5-remove-format/src/index';
import { Bold, Code, Italic, Strikethrough, Underline } from '../../ckeditor5-basic-styles/src/index';
import { Markdown } from '../../ckeditor5-markdown-gfm/src/index';
import { MarkdownGuide, type MarkdownGuideURL } from './markdownguide';
import { Mention, type MentionConfig } from '../../ckeditor5-mention/src/index';
import { Image, ImageUpload, ImageStyle, ImageToolbar, AutoImage, type ImageConfig } from '../../ckeditor5-image/src/index';

// Ensure augmentation.ts from plugins are explicitly imported in d.ts files
// so the type `EditorConfig` is properly aligned with the plugins
export { LinkConfig, MarkdownGuideURL, MentionConfig, ImageConfig };

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
