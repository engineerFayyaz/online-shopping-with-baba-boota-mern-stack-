import { createSlice } from "@reduxjs/toolkit";
import { setStorageData } from "../utils/useLocalStorage";

const Filter = "FILTER";

const initialState = {cars:[],models:[],versions:[]};

const carFilterSlice = createSlice({
  name: "carFilter",
  initialState,
  reducers: {
    addCars: (state, action) => {
          state.cars=action.payload
    },
  },
});

export const carFilterReducer = carFilterSlice.reducer;

export const {
  addCars,
} = carFilterSlice.actions;
