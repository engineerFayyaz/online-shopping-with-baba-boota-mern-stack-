import { createSlice } from "@reduxjs/toolkit";
import { setStorageData } from "../utils/useLocalStorage";

const DETAIL = "DETAIL";

const initialState = {product:null,isOpen:false};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    addDetail: (state, action) => {
          state.product=action.payload
    },
    open: (state, action) => {
      state.isOpen=action.payload
},
close: (state, action) => {
  state.isOpen=action.payload
},
  },
});

export const productDetailReducer = productDetailSlice.reducer;

export const {
    addDetail,
    open,
    close,
} = productDetailSlice.actions;