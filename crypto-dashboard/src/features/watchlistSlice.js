import { createSlice } from '@reduxjs/toolkit'

// Load watchlist from localStorage
const loadWatchlistFromStorage = () => {
  try {
    const serializedWatchlist = localStorage.getItem('watchlist')
    if (serializedWatchlist === null) {
      return []
    }
    return JSON.parse(serializedWatchlist)
  } catch (err) {
    return []
  }
}

// Save watchlist to localStorage
const saveWatchlistToStorage = (watchlist) => {
  try {
    const serializedWatchlist = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', serializedWatchlist)
  } catch (err) {
    console.error('Could not save watchlist to localStorage:', err)
  }
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: loadWatchlistFromStorage(),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const item = action.payload
      const exists = state.items.find(i => i.id === item.id && i.type === item.type)
      if (!exists) {
        state.items.push(item)
        saveWatchlistToStorage(state.items)
      }
    },
    removeFromWatchlist: (state, action) => {
      const { id, type } = action.payload
      state.items = state.items.filter(item => !(item.id === id && item.type === type))
      saveWatchlistToStorage(state.items)
    },
    clearWatchlist: (state) => {
      state.items = []
      saveWatchlistToStorage(state.items)
    },
  },
})

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer