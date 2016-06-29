import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import {expect} from "chai";

import Cart from "../src/components/cart/cart-view";
import CartButton from "../src/components/cart/cart-button-view";
import CartStore from "../src/components/cart/cart-store";
import CartAction from "../src/components/cart/cart-action";

/**
 * カートコンポーネントのテスト
 */
describe('Cart', ()=>{

	beforeEach(()=>{
		CartStore._clear();
	});

	it('カートの中身は初期値は0件である', () => {
		let component = ReactTestUtils.renderIntoDocument(<Cart />);

		expect(component.state.items).to.have.length(0);
	});

	it('カートに追加すると1件になる', () => {
		let component = ReactTestUtils.renderIntoDocument(<Cart />);
		CartAction.add({
			id  : '1',
			name: '1'
		});

		expect(component.state.items).to.have.length(1);
	});

	it('カートに3件追加し、1件削除すると2件になる', () => {
		let component = ReactTestUtils.renderIntoDocument(<Cart />);
		CartAction.add({
			id  : '1',
			name: '1'
		});
		CartAction.add({
			id  : '2',
			name: '2'
		});
		CartAction.add({
			id  : '3',
			name: '3'
		});
		CartAction.remove({
			id  : '2',
			name: '2'
		});
		expect(component.state.items).to.have.length(2);
	});

	it('既に含まれているIDを追加しようとするとエラーになって追加されない', () => {
		let component = ReactTestUtils.renderIntoDocument(<Cart />);
		CartAction.add({
			id: '1',
			name: '1'
		});
		expect(component.state.items).to.have.length(1);

		expect(()=>CartAction.add({
			id: '1',
			name: '1'
		})).to.throw(Error);

		expect(component.state.items).to.have.length(1);
	});

	it('含まれていないIDを削除しようとするとエラーになる', () => {
		let component = ReactTestUtils.renderIntoDocument(<Cart />);
		CartAction.add({
			id: '1',
			name: '1'
		});
		expect(component.state.items).to.have.length(1);

		expect(()=>CartAction.remove({
			id: '2',
			name: '2'
		})).to.throw(Error);

		expect(component.state.items).to.have.length(1);
	});

	it('リクエストボタンをクリックしたらカートに追加される', ()=>{
		let cart = ReactTestUtils.renderIntoDocument(<Cart />);
		let cartButton = ReactTestUtils.renderIntoDocument(
			<CartButton item={{id : '1', name : '1'}} />
		);
		ReactTestUtils.Simulate.click(cartButton.refs['button']);

		expect(cart.state.items).to.have.length(1);
	});

	it('既に含まれている商品のリクエストボタンをクリックしたらカートから削除される', ()=>{
		var item = {id : '1', name : '1'};
		CartAction.add(item);

		let cart = ReactTestUtils.renderIntoDocument(<Cart />);
		expect(cart.state.items).to.have.length(1);

		let cartButton = ReactTestUtils.renderIntoDocument(
			<CartButton item={item} />
		);
		ReactTestUtils.Simulate.click(cartButton.refs['button']);

		expect(cart.state.items).to.have.length(0);
	});
});