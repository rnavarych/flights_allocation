import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { apiMiddleware } from '../middleware/api';

const middlewares = [thunk, apiMiddleware];
const { logger } = require('redux-logger');

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(...middlewares));
}
