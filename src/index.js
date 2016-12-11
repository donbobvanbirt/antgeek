import React from 'react';
import { render } from 'react-dom';
import { Provider }  from 'react-redux';
import CustomRouter from './components/CustomRouter';

import { initAuth } from './actions/auth';

import store from './store';


initAuth(store.dispatch)
  .then(() => {
    render(
      <Provider store={store}>
        <CustomRouter />
      </Provider>,
      document.getElementById('root')
    );
  });
