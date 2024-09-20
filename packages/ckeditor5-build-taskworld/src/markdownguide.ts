import { Plugin } from '../../ckeditor5-core/src/index.js';
import { LinkView } from '../../ckeditor5-ui/src/index.js';
import icon from './markdown.svg';

/**
 * @extends module:core/plugin~Plugin
 */
export default class MarkdownGuide extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [ MarkdownGuideUI ] as const;
	}

	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'MarkdownGuide' as const;
	}
}

const NAME = 'markdownGuide';

/**
 * @extends module:core/plugin~Plugin
 */
class MarkdownGuideUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'MarkdownGuideUI' as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( NAME, locale => {
			const view = new LinkView( locale );

			view.set( {
				label: t( 'Markdown Guide' ),
				icon,
				withText: true,
				href: editor.config.get( 'markdownGuideURL' )
			} );

			return view;
		} );
	}
}
