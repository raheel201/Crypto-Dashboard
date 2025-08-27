import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunks for API calls
export const fetchCryptoData = createAsyncThunk(
  'market/fetchCryptoData',
  async () => {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
    )
    return response.data
  }
)

export const fetchStockData = createAsyncThunk(
  'market/fetchStockData',
  async () => {
    // Using a mock API for stocks since Yahoo Finance requires authentication
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC']
    const stockData = symbols.map((symbol, index) => ({
      id: symbol.toLowerCase(),
      symbol,
      name: `${symbol} Inc.`,
      current_price: 150 + Math.random() * 200,
      price_change_percentage_24h: (Math.random() - 0.5) * 10,
      market_cap: 1000000000 + Math.random() * 2000000000,
      total_volume: 50000000 + Math.random() * 100000000,
      image: `https://logo.clearbit.com/${symbol.toLowerCase()}.com`
    }))
    return stockData
  }
)

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    cryptoData: [],
    stockData: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false
        state.cryptoData = action.payload
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false
        state.stockData = action.payload
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default marketSlice.reducer