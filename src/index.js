'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import Calendar from './containers/calendar';

let store = createStore(reducers);
render (
	<Provider store={store}>
		<Calendar />
	</Provider>, document.getElementById('calendar')
)