/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module link/ui/linkactionsview
 */

import { ButtonView, View, ViewCollection, FocusCycler, type FocusableView } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type LocaleTranslate, type Locale } from 'ckeditor5/src/utils.js';
import { icons } from 'ckeditor5/src/core.js';

import { ensureSafeUrl } from '../utils.js';

// See: #8833.
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../../theme/linkactions.css';

import unlinkIcon from '../../theme/icons/unlink.svg';
import type { LinkConfig } from '../linkconfig.js';

/**
 * The link actions view class. This view displays the link preview, allows
 * unlinking or editing the link.
 */
export default class LinkActionsView extends View {
	/**
	 * Tracks information about DOM focus in the actions.
	 */
	public readonly focusTracker = new FocusTracker();

	/**
	 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
	 */
	public readonly keystrokes = new KeystrokeHandler();

	/**
	 * The href preview view.
	 */
	public previewButtonView: ButtonView;

	/**
	 * The unlink button view.
	 */
	public unlinkButtonView: ButtonView;

	/**
	 * The edit link button view.
	 */
	public editButtonView: ButtonView;

	/**
	 * The value of the "href" attribute of the link to use in the {@link #previewButtonView}.
	 *
	 * @observable
	 */
	declare public href: string | undefined;

	/**
	 * A collection of views that can be focused in the view.
	 */
	private readonly _focusables = new ViewCollection<FocusableView>();

	/**
	 * Helps cycling over {@link #_focusables} in the view.
	 */
	private readonly _focusCycler: FocusCycler;

	private readonly _linkConfig: LinkConfig;

	declare public t: LocaleTranslate;

	/**
	 * @inheritDoc
	 */
	constructor( locale: Locale, linkConfig: LinkConfig = {} ) {
		super( locale );

		const t = locale.t;

		this.previewButtonView = this._createPreviewButton();
		this.unlinkButtonView = this._createButton( t( 'Unlink' ), unlinkIcon, 'unlink' );

		/**
		 * The edit link button view.
		 *
		 * @member {module:ui/button/buttonview~ButtonView}
		 */
		this.editButtonView = this._createButton( t( 'Edit' ), icons.pencil, 'edit', 'ck-button-edit' );

		this.set( 'href', undefined );

		this._linkConfig = linkConfig;

		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-link-actions',
					'ck-responsive-form'
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				this.previewButtonView,
				this.editButtonView,
				this.unlinkButtonView
			]
		} );
	}

	/**
	 * @inheritDoc
	 */
	public override render(): void {
		super.render();

		const childViews = [
			this.previewButtonView,
			this.editButtonView,
			this.unlinkButtonView
		];

		childViews.forEach( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element! );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element! );
	}

	/**
	 * @inheritDoc
	 */
	public override destroy(): void {
		super.destroy();

		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}

	/**
	 * Focuses the fist {@link #_focusables} in the actions.
	 */
	public focus(): void {
		this._focusCycler.focusFirst();
	}

	/**
	 * Creates a button view.
	 *
	 * @param label The button label.
	 * @param icon The button icon.
	 * @param eventName An event name that the `ButtonView#execute` event will be delegated to.
	 * @returns The button view instance.
	 */
	private _createButton( label: string, icon: string, eventName?: string, className?: string ): ButtonView {
		const button = new ButtonView( this.locale );

		button.set( {
			label,
			withText: true
		} );

		if ( className ) {
			button.extendTemplate( {
				attributes: {
					class: className
				}
			} );
		}

		button.delegate( 'execute' ).to( this, eventName );

		return button;
	}

	/**
	 * Creates a link href preview button.
	 *
	 * @returns The button view instance.
	 */
	private _createPreviewButton(): ButtonView {
		const button = new ButtonView( this.locale );
		const bind = this.bindTemplate;
		const t = this.t;

		button.set( {
			withText: true
		} );

		button.extendTemplate( {
			attributes: {
				class: [
					'ck',
					'ck-link-actions__preview'
				],
				href: bind.to( 'href', href => href && ensureSafeUrl( href, this._linkConfig.allowedProtocols ) ),
				target: '_blank',
				rel: 'noopener noreferrer'
			}
		} );

		button.bind( 'label' ).to( this, 'href', href => {
			return href || t( 'This link has no URL' );
		} );

		button.bind( 'isEnabled' ).to( this, 'href', href => !!href );

		button.template!.tag = 'a';
		button.template!.eventListeners = {};

		return button;
	}
}

/**
 * Fired when the {@link ~LinkActionsView#editButtonView} is clicked.
 *
 * @eventName ~LinkActionsView#edit
 */
export type EditEvent = {
	name: 'edit';
	args: [];
};

/**
 * Fired when the {@link ~LinkActionsView#unlinkButtonView} is clicked.
 *
 * @eventName ~LinkActionsView#unlink
 */
export type UnlinkEvent = {
	name: 'unlink';
	args: [];
};
