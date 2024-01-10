import { svelteStoreEnhancer } from "@ourway/svelte-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { Writable } from "svelte/store";
import { counter } from "./counter";

const reducer = {
  counter,
};

const reduxStore = configureStore({
  reducer,
  enhancers: [svelteStoreEnhancer],
  devTools: { maxAge: 100000 },
});
export type ReduxStore = typeof reduxStore;
export type GlobalState = ReturnType<typeof reduxStore.getState>;
export type SvelteStore = Writable<GlobalState>;

export const store = reduxStore as ReduxStore & SvelteStore;
