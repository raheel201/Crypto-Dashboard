import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWatchlist } from '../features/watchlistSlice'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'

const Watchlist = ({ compact = false }) => {
  const dispatch = useDispatch()
  const watchlistItems = useSelector(state => state.watchlist.items)

  const handleRemove = (id, type) => {
    dispatch(removeFromWatchlist({ id, type }))
  }

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  if (watchlistItems.length === 0) {
    return (
      <div className={compact ? "p-4" : "card"}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Watchlist
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No items in your watchlist yet. Add some assets to track them here!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={compact ? "p-4" : "card"}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Watchlist ({watchlistItems.length})
      </h3>
      
      <div className="space-y-3">
        {watchlistItems.map((item) => {
          const isPositive = (item.price_change_percentage_24h || 0) >= 0
          
          return (
            <div
              key={`${item.id}-${item.type}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.image || `https://via.placeholder.com/32?text=${item.symbol}`}
                  alt={item.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/32?text=${item.symbol}`
                  }}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.symbol?.toUpperCase()}
                    </span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </div>
                  {!compact && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">
                      {item.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(item.current_price)}
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    isPositive ? 'text-success' : 'text-danger'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}{(item.price_change_percentage_24h || 0).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id, item.type)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Watchlist