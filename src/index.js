import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

import App from './components/App';
import reducers from './reducers';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

store.subscribe(throttle(() => {
  const { expires_at } = store.getState().auth;
  const isValidSession = (new Date().getTime() / 1000) < expires_at

  if (isValidSession) {
    saveState({
      auth: store.getState().auth,
    });
  }
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
