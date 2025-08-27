import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearWatchlist } from '../features/watchlistSlice'
import Watchlist from '../components/Watchlist'
import Chart3D from '../components/Chart3D'
import { Trash2 } from 'lucide-react'

const WatchlistPage = () => {
  const dispatch = useDispatch()
  const watchlistItems = useSelector(state => state.watchlist.items)
  const { cryptoData, stockData } = useSelector(state => state.market)

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      dispatch(clearWatchlist())
    }
  }

  // Get full data for watchlist items for 3D visualization
  const watchlistWithFullData = React.useMemo(() => {
    return watchlistItems.map(item => {
      if (item.type === 'crypto') {
        const fullData = cryptoData.find(crypto => crypto.id === item.id)
        return fullData || item
      } else {
        const fullData = stockData.find(stock => stock.id === item.id)
        return fullData || item
      }
    })
  }, [watchlistItems, cryptoData, stockData])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Watchlist
        </h2>
        {watchlistItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {watchlistItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Watchlist />
          {watchlistWithFullData.length > 0 && (
            <Chart3D 
              data={watchlistWithFullData} 
              title="Watchlist 3D Visualization" 
            />
          )}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start building your watchlist by adding cryptocurrencies and stocks you want to track.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/crypto"
                className="btn-primary"
              >
                Browse Crypto
              </a>
              <a
                href="/stocks"
                className="btn-secondary"
              >
                Browse Stocks
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WatchlistPage