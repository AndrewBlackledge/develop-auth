import { createAction, createReducer } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

export const increment = createAction("increment");
export const decrement = createAction("decrement");

export const initialState: CounterState = {
  value: 0,
};

export const counter = createReducer(initialState, (r) => {
  r.addCase(increment, (state, action) => {
    state.value++;
  });
  r.addCase(decrement, (state, action) => {
    state.value = Math.max(state.value - 1, 0);
  });
});
