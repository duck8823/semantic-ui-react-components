import React from "react";
import CartStore from "./cart-store";

import {Constants} from "./constants";

import $ from 'jquery';
import 'semantic-ui-modal/modal.css'
$.fn.modal = require('semantic-ui-modal');

import 'semantic-ui-dimmer/dimmer.css';
$.fn.dimmer = require('semantic-ui-dimmer');

import 'semantic-ui-transition/transition.css';
$.fn.transition = require('semantic-ui-transition');

/**
 * カートのView
 */
export default class CartView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: CartStore.getItems()
		};
	}

	componentWillMount() {
		CartStore.on(Constants.ADD, () => {
			this.setState({
				items: CartStore.getItems()
			});
		});
		CartStore.on(Constants.REMOVE, () => {
			this.setState({
				items: CartStore.getItems()
			});
		});
	}

	_open() {
		$(".ui.modal.cart").modal('show');
	}

	render() {
		return (
			<div>
				<div className="ui labeled button modal-button" ref="modal" onClick={this._open.bind(this)}>
					<div className="ui button">
						<i className="shop icon"></i> Cart
					</div>
					<div className="ui basic left pointing label count">
						{this.state.items.length}
					</div>
				</div>
				<div className="ui modal cart">
					<i className="close icon"></i>
					<div className="header">
						Cart
					</div>
					<div className="ui description">
						<div ref="item-list" className="ui middle aligned divided list item-list">
							{this.state.items.map((item) => {
								return (
									<div key={item.id} className="item">
										<div className="content">
											{item.name}
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className="actions">
						<div className="ui black deny button">
							Cancel
						</div>
						<div className="ui positive right labeled icon button">
							OK
							<i className="checkmark icon"></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
