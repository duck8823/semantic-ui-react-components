import EventEmitter from 'events';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import {Constants} from './constants';

const CONSTANTS = {
	CART : 'CART'
};
/**
 * カートのStore
 */
class CartStore extends EventEmitter {

	constructor() {
		super();
		var items = window.sessionStorage.getItem(CONSTANTS.CART);
		this._items = items ? JSON.parse(items) : {};
		AppDispatcher.register(this._onAction.bind(this));
	}

	/**
	 * 商品を追加する
	 * @param item
	 */
	add(item) {
		if(this.contains(item)){
			throw new Error("already contains: " + item.id);
		}
		this._items[item.id] = item;
		this._save();
		this.emit(Constants.ADD);
	}

	/**
	 * 商品を削除する
	 * @param item
	 */
	remove(item) {
		if(!this.contains(item)){
			throw new Error("not contains: " + item.id);
		}
		delete this._items[item.id];
		this._save();
		this.emit(Constants.REMOVE);
	}

	/**
	 * idが含まれているかどうか
	 * @param item
	 */
	contains(item) {
		return this._items[item.id] ? true : false;
	};

	/**
	 * WebStorageに保存する
	 * @private
	 */
	_save() {
		window.sessionStorage.setItem(CONSTANTS.CART, JSON.stringify(this._items));
	}

	/**
	 * 初期化する
	 * @private
	 */
	_clear() {
		this._items = {};
		window.sessionStorage.removeItem(CONSTANTS.CART);
	}

	_onAction(action) {
		switch (action.type) {
			case Constants.ADD:
				this.add(action.item);
				break;
			case Constants.REMOVE:
				this.remove(action.item);
				break;
			default:
			// nothing to do.
		}
	}

	getItems() {
		var items = [];
		Object.keys(this._items).forEach((key) => items.push(this._items[key]));
		return items;
	}
}
const cartStore = new CartStore();
export default cartStore;