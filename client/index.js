import React from 'react';
import { hydrate, render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import routes from '../both/routes';
import reducers from '../both/reducers';

import App from '../both/app.js';

// This value is rendered into the DOM by the server
const initialState = window.__INITIAL_STATE;

const history = createHistory();
const middleware = routerMiddleware(history);

// Create store with the initial state generated by the server
const store = createStore(reducers, initialState, applyMiddleware(middleware));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReduxAsyncConnect routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
