import { createStore, combineReducers, applyMiddleware } from 'redux';
import cryptoReducer from "./reducers/cryptoReducer";

import thunk from "redux-thunk";

const reducer = combineReducers({
    cryptoReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;