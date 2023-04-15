import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  adminLoginReducer,
  adminRegisterReducer,
  adminViewReducer,
  adminUpdateReducer,
} from "./reducers/adminReducers";

import {
  customerLoginReducer,
  customerRegisterReducer,
  customerViewReducer,
  customerUpdateReducer,
  customerDeleteReducer,
  customerListReducer,
  customerViewByIdReducer,
  customerUpdateByIdReducer,
  customerDeleteByIdReducer,
} from "./reducers/customerReducers";

import {
  vendorLoginReducer,
  vendorRegisterReducer,
  vendorViewReducer,
  vendorUpdateReducer,
  vendorDeleteReducer,
  vendorListReducer,
  vendorViewByIdReducer,
  vendorUpdateByIdReducer,
  vendorDeleteByIdReducer,
} from "./reducers/vendorReducers";

const reducer = combineReducers({
  admin_Login: adminLoginReducer,
  adminRegistration: adminRegisterReducer,
  adminView: adminViewReducer,
  adminUpdate: adminUpdateReducer,
  customer_Login: customerLoginReducer,
  customerRegistration: customerRegisterReducer,
  customerView: customerViewReducer,
  customerUpdate: customerUpdateReducer,
  customerList: customerListReducer,
  customerDelete: customerDeleteReducer,
  customerViewById: customerViewByIdReducer,
  customerUpdateById: customerUpdateByIdReducer,
  customerDeleteById: customerDeleteByIdReducer,
  vendor_Login: vendorLoginReducer,
  vendorRegistration: vendorRegisterReducer,
  vendorView: vendorViewReducer,
  vendorUpdate: vendorUpdateReducer,
  vendorList: vendorListReducer,
  vendorDelete: vendorDeleteReducer,
  vendorViewById: vendorViewByIdReducer,
  vendorUpdateById: vendorUpdateByIdReducer,
  vendorDeleteById: vendorDeleteByIdReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const customerInfoFromStorage = localStorage.getItem("customerInfo")
  ? JSON.parse(localStorage.getItem("customerInfo"))
  : null;

const vendorInfoFromStorage = localStorage.getItem("vendorInfo")
  ? JSON.parse(localStorage.getItem("vendorInfo"))
  : null;

const initialState = {
  admin_Login: { adminInfo: adminInfoFromStorage },
  customer_Login: { customerInfo: customerInfoFromStorage },
  vendor_Login: { vendorInfo: vendorInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
