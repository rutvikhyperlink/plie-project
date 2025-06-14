import redState from "./StoreState";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

export default () => {
 const rootReducer = combineReducers({ redState: redState });
 return legacy_createStore(rootReducer, applyMiddleware(thunk));
};