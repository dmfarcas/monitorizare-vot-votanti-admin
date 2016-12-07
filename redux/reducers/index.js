import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import incidents from './incidents';
import counties from './counties';

const rootReducer = combineReducers({
  counties,
  incidents,
});

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
