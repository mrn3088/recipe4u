import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'

import { rootReducer } from "./root-reducer";

// middleware example
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('nextState: ', store.getState());
}


const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);