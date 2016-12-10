import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux';
import CustomRouter from './components/CustomRouter';

import { initAuth } from './actions/auth';

import store from './store';

render(
  <Provider store={store}>
    <CustomRouter />
  </Provider>,
  document.getElementById('root')
);

initAuth(store.dispatch);
