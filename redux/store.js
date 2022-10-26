import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { cartReducer } from "./cart.slice";
import { settingsReducer } from "./settings.slice";
import { carFilterReducer } from "./carFilter.slice";
import { productDetailReducer } from "./productDetail.slice";
import { categoriesReducer } from "./categories.slice";


const combinedReducer = combineReducers({
  cart: cartReducer,
  settings: settingsReducer,
  carFilter:carFilterReducer,
  productDetail:productDetailReducer,
  categories:categoriesReducer
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply data from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    // devTools: true,
  });

export const wrapper = createWrapper(makeStore);
