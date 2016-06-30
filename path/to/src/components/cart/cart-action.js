import AppDispatcher from "../../app-dispatcher";
import {Constants} from "./constants";

/**
 * カートのAction
 */
export default class CartAction {
	
	static add(item) {
		AppDispatcher.dispatch({
			type: Constants.ADD,
			item: item
		});
	}

	static remove(item) {
		AppDispatcher.dispatch({
			type: Constants.REMOVE,
			item: item
		});
	}
}