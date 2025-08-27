import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../features/watchlistSlice'
import { Star, TrendingUp, TrendingDown } from 'lucide-react'

const MarketCard = ({ asset, type }) => {
  const dispatch = useDispatch()
  const watchlist = useSelector(state => state.watchlist.items)
  
  const isInWatchlist = watchlist.some(item => item.id === asset.id && item.type === type)
  const priceChange = asset.price_change_percentage_24h || 0
  const isPositive = priceChange >= 0

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ id: asset.id, type }))
    } else {
      dispatch(addToWatchlist({
        id: asset.id,
        type,
        symbol: asset.symbol,
        name: asset.name,
        current_price: asset.current_price,
        image: asset.image,
        price_change_percentage_24h: priceChange
      }))
    }
  }

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={asset.image || `https://via.placeholder.com/40?text=${asset.symbol}`}
            alt={asset.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/40?text=${asset.symbol}`
            }}
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {asset.symbol?.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">
              {asset.name}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleWatchlistToggle}
          className={`p-1 rounded-full transition-colors ${
            isInWatchlist
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <Star className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(asset.current_price)}
          </span>
          <div className={`flex items-center space-x-1 ${
            isPositive ? 'text-success' : 'text-danger'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatMarketCap(asset.market_cap)}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Volume 24h</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatMarketCap(asset.total_volume)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketCard