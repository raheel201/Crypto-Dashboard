import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, setTimeframe, setSortBy } from '../features/uiSlice'
import { Sun, Moon, RefreshCw } from 'lucide-react'
import { fetchCryptoData, fetchStockData } from '../features/marketSlice'

const Topbar = () => {
  const dispatch = useDispatch()
  const { theme, timeframe, sortBy } = useSelector(state => state.ui)
  const { loading, lastUpdated } = useSelector(state => state.market)

  const handleRefresh = () => {
    dispatch(fetchCryptoData())
    dispatch(fetchStockData())
  }

  const timeframes = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
  ]

  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'price_change_percentage_24h', label: '24h Change' },
    { value: 'current_price', label: 'Price' },
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Market Overview
            </h2>
            {lastUpdated && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Timeframe Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Timeframe:</span>
              <select
                value={timeframe}
                onChange={(e) => dispatch(setTimeframe(e.target.value))}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
              >
                {timeframes.map(tf => (
                  <option key={tf.value} value={tf.value}>{tf.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar