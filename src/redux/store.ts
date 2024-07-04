// store.ts

import { configureStore } from '@reduxjs/toolkit'
import { Store} from 'redux';

export interface State {
  tick: string;
}

export const makeStore = () => {
    return configureStore({
      reducer: {}
    })
  }

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']