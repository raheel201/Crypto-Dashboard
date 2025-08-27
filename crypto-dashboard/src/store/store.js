import { configureStore } from '@reduxjs/toolkit'
import marketReducer from '../features/marketSlice'
import watchlistReducer from '../features/watchlistSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
  reducer: {
    market: marketReducer,
    watchlist: watchlistReducer,
    ui: uiReducer,
  },
})