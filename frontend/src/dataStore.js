import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  forgotPasswordReducer,
  profileReducer,
} from "./reducers/userReducer";

import {
  medicineReducer,
  notificationReducer,
} from "./reducers/medicineReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  medicine: medicineReducer,
  notify: notificationReducer,
});

let initialState = {};
const middleware = [thunk];

const dataStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default dataStore;
