import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import search from './reducers/search';
import swipe from './reducers/swipe';

export default createStore(
  combineReducers({
    search,
    swipe
  }),
  applyMiddleware(thunk)
);
