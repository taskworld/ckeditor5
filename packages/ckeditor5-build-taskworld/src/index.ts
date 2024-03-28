import { createElement, type ReactElement } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import EditorEngine from './ckeditor.js';

/**
 * @see https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#component-properties
 */
export default function TaskworldCKEditor( props: {
	data?: string;
	placeholder?: string;
	config: object;
	disabled?: boolean;
	onReady: ( editor: EditorEngine ) => void;
	onChange?: ( event: any, editor: EditorEngine ) => void;
	onBlur?: ( event: any, editor: EditorEngine ) => void;
	onFocus?: ( event: any, editor: EditorEngine ) => void;
} ): ReactElement {
	return createElement(
		CKEditor as any, // See https://github.com/ckeditor/ckeditor5/issues/15783
		{ ...props, editor: EditorEngine } );
}

export { default as EditorEngine } from './ckeditor.js';

declare module '@ckeditor/ckeditor5-core' {
	interface EditorConfig {
		markdownGuideURL?: string;
	}
}

// Allow injecting translation object
// See https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/ui/localization.html#:~:text=extending%20the%20global-,window.CKEDITOR_TRANSLATIONS%20object,-.%0AThis%20can
declare global {
	interface Window {
		CKEDITOR_TRANSLATIONS: {
			[language: string]: {
				dictionary: Record<string, string>;
			};
		};
	}
}
