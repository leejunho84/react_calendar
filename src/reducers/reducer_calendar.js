'use strict';
import { CREATE_COUPON, REMOVE_COUPON, FILTER_COUPON } from '../actions';

const calendar = (state=[], action) => {
	switch(action.type){
		case CREATE_COUPON:
			return [...state, {
				'code':action.code,
				'complete':true
			}]
		default:
			return state
	}
}

export default calendar