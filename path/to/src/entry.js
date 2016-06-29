// CSS
import 'semantic-ui-css/semantic.css'

import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";

import Cart from "./components/cart/cart-view";
import Button from "./components/cart/cart-button-view";

$(".ui.cart").each(function(){
	ReactDOM.render(
		<Cart />,
		$(this).get(0)
	);
});
$(".ui.cart-button").each(function(){
	var item = {
		id : $(this).data('id'),
		name :$(this).data('name')
	};
	ReactDOM.render(
		<Button item={item} />,
		$(this).get(0)
	);
});