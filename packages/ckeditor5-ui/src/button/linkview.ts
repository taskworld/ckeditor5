/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import View from '../view.js';
import IconView from '../icon/iconview.js';
import type ViewCollection from '../viewcollection.js';
import type Button from './button.js';

import {
	getEnvKeystrokeText,
	uid,
	type Locale
} from '@ckeditor/ckeditor5-utils';

export default class LinkView extends View<HTMLAnchorElement> implements Button {
	public readonly children: ViewCollection;
	public readonly labelView: View;
	public readonly iconView: IconView;
	public readonly keystrokeView: View;
	declare public class: string | undefined;
	declare public labelStyle: string | undefined;
	declare public icon: string | undefined;
	declare public isEnabled: boolean;
	declare public isOn: boolean;
	declare public isVisible: boolean;
	declare public isToggleable: boolean;
	declare public keystroke: string | undefined;
	declare public label: string | undefined;
	declare public href: string | undefined;
	declare public tabindex: number;
	declare public tooltip: Button['tooltip'];
	declare public tooltipPosition: Button['tooltipPosition'];
	declare public type: Button['type'];
	declare public withText: boolean;
	declare public withKeystroke: boolean;
	declare public ariaLabel?: string | undefined;
	declare public ariaLabelledBy: string | undefined;
	declare public _tooltipString: string;

	/**
	 * @inheritDoc
	 */
	constructor( locale: Locale ) {
		super( locale );

		const bind = this.bindTemplate;
		const ariaLabelUid = uid();

		// Implement the Button interface.
		this.set( 'ariaLabel', undefined );
		this.set( 'ariaLabelledBy', `ck-editor__aria-label_${ ariaLabelUid }` );
		this.set( 'class', undefined );
		this.set( 'labelStyle', undefined );
		this.set( 'icon', undefined );
		this.set( 'isEnabled', true );
		this.set( 'isOn', false );
		this.set( 'isVisible', true );
		this.set( 'isToggleable', false );
		this.set( 'keystroke', undefined );
		this.set( 'label', undefined );
		this.set( 'tabindex', -1 );
		this.set( 'tooltip', false );
		this.set( 'tooltipPosition', 's' );
		this.set( 'type', 'button' );
		this.set( 'withText', false );
		this.set( 'withKeystroke', false );

		/**
		 * Collection of the child views inside of the button {@link #element}.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this.createCollection();

		/**
		 * Label of the button view. It is configurable using the {@link #label label attribute}.
		 *
		 * @readonly
		 * @member {module:ui/view~View} #labelView
		 */
		this.labelView = this._createLabelView( );

		/**
		 * The icon view of the button. Will be added to {@link #children} when the
		 * {@link #icon icon attribute} is defined.
		 *
		 * @readonly
		 * @member {module:ui/icon/iconview~IconView} #iconView
		 */
		this.iconView = new IconView();

		this.iconView.extendTemplate( {
			attributes: {
				class: 'ck-link__icon'
			}
		} );

		this.keystrokeView = this._createKeystrokeView();

		this.bind( '_tooltipString' ).to(
			this, 'tooltip',
			this, 'label',
			this, 'keystroke',
			this._getTooltipString.bind( this )
		);

		this.setTemplate( {
			tag: 'a',

			attributes: {
				class: [
					'ck',
					'ck-link',
					bind.to( 'class' ),
					bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' ),
					bind.if( 'withText', 'ck-link_with-text' ),
					bind.if( 'withKeystroke', 'ck-link_with-keystroke' )
				],
				href: bind.to( 'href' ),
				target: '_blank',
				rel: 'noopener noreferrer',
				'aria-label': bind.to( 'ariaLabel' ),
				'aria-labelledby': bind.to( 'ariaLabelledBy' ),
				'data-cke-tooltip-text': bind.to( '_tooltipString' ),
				'data-cke-tooltip-position': bind.to( 'tooltipPosition' )
			},

			children: this.children
		} );
	}

	/**
	 * @inheritDoc
	 */
	public override render(): void {
		super.render();

		if ( this.icon ) {
			this.iconView.bind( 'content' ).to( this, 'icon' );
			this.children.add( this.iconView );
		}

		this.children.add( this.labelView );

		if ( this.withKeystroke && this.keystrokeView ) {
			this.children.add( this.keystrokeView );
		}
	}

	/**
	 * Focuses the {@link #element} of the button.
	 */
	public focus(): void {
		this.element!.focus();
	}

	/**
	 * Binds the label view instance it with button attributes.
	 */
	private _createLabelView( ): View {
		const labelView = new View();
		const bind = this.bindTemplate;

		labelView.setTemplate( {
			tag: 'span',

			attributes: {
				class: [
					'ck',
					'ck-link__label'
				],
				style: bind.to( 'labelStyle' )
			},

			children: [
				{
					text: this.bindTemplate.to( 'label' )
				}
			]
		} );

		return labelView;
	}

	/**
	 * Creates a view that displays a keystroke next to a {@link #labelView label }
	 * and binds it with button attributes.
	 */
	private _createKeystrokeView(): View {
		const keystrokeView = new View();

		keystrokeView.setTemplate( {
			tag: 'span',

			attributes: {
				class: [
					'ck',
					'ck-link__keystroke'
				]
			},

			children: [
				{
					text: this.bindTemplate.to( 'keystroke', text => getEnvKeystrokeText( text! ) )
				}
			]
		} );

		return keystrokeView;
	}

	/**
	 * Gets the text for the {@link #tooltipView} from the combination of
	 * {@link #tooltip}, {@link #label} and {@link #keystroke} attributes.
	 *
	 * @see #tooltip
	 * @see #_tooltipString
	 */
	private _getTooltipString( tooltip: Button['tooltip'], label: string | undefined, keystroke: string | undefined ): string {
		if ( tooltip ) {
			if ( typeof tooltip == 'string' ) {
				return tooltip;
			} else {
				if ( keystroke ) {
					keystroke = getEnvKeystrokeText( keystroke );
				}

				if ( tooltip instanceof Function ) {
					return tooltip( label!, keystroke );
				} else {
					return `${ label }${ keystroke ? ` (${ keystroke })` : '' }`;
				}
			}
		}

		return '';
	}
}
