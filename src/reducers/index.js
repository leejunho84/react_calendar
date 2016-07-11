'use strict';

import { combineReducers } from 'redux';
import calendar from './reducer_calendar';

const combineReducer = combineReducers({
	calendar
});

export default combineReducer;