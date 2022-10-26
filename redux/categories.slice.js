import { createSlice } from "@reduxjs/toolkit";
import { setStorageData } from "../utils/useLocalStorage";

const CATEGORIES = "CATEGORIES";

const initialState = {categories:[]};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories: (state, action) => {
          state.categories=action.payload
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
  addCategories,
} = categoriesSlice.actions;
