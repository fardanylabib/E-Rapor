import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { logger } from 'redux-logger';
import reducer from './store/Reducer';
import rootSaga from './store/Sagas';

const sagaMiddleware = createSagaMiddleware();
const theStore = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store = {theStore}><App/></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();