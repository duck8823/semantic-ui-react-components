import React from 'react';

import CartStore from './cart-store';
import CartAction from './cart-action';

/**
 * ボタンのView
 */
export default class CartButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contains: CartStore.contains(this.props.item)
		};
		
	}

	_onAction() {
		const {contains} = this.state;
		const {item} = this.props;
		if(contains){
			CartAction.remove(item);
		} else {
			CartAction.add(item);
		}
		this.setState({contains: contains ? false : true});
	}

	render() {
		const {contains} = this.state;
		return (
			<div className="ui vertical animated button" ref="button" onClick={this._onAction.bind(this)}>
				<div className="hidden content">
					{contains ? 'Remove' : 'Add'}
				</div>
				<div className="visible content compact">
					<i className={contains ? "trash outline icon" : "add to cart icon"}></i>
				</div>
			</div>
		)
	}
}
