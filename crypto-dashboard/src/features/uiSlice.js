import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
    activeTab: 'crypto',
    timeframe: '24h',
    sortBy: 'market_cap',
    sortOrder: 'desc',
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
      document.documentElement.classList.toggle('dark', state.theme === 'dark')
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setTimeframe: (state, action) => {
      state.timeframe = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
  },
})

export const { toggleTheme, setActiveTab, setTimeframe, setSortBy, setSortOrder } = uiSlice.actions
export default uiSlice.reducer