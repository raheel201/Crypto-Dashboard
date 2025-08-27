import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import CryptoPage from './pages/CryptoPage'
import StocksPage from './pages/StocksPage'
import WatchlistPage from './pages/WatchlistPage'
import { fetchCryptoData, fetchStockData } from './features/marketSlice'

function App() {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.ui.theme)

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
    
    // Initial data fetch
    dispatch(fetchCryptoData())
    dispatch(fetchStockData())

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptoData())
      dispatch(fetchStockData())
    }, 30000)

    return () => clearInterval(interval)
  }, [dispatch, theme])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<CryptoPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </DashboardLayout>
    </div>
  )
}

export default App