import React from 'react'
import { useSelector } from 'react-redux'
import MarketCard from '../components/MarketCard'
import Chart3D from '../components/Chart3D'
import Watchlist from '../components/Watchlist'

const StocksPage = () => {
  const { stockData, loading, error } = useSelector(state => state.market)
  const { sortBy, sortOrder } = useSelector(state => state.ui)

  const sortedData = React.useMemo(() => {
    if (!stockData.length) return []
    
    return [...stockData].sort((a, b) => {
      let aValue = a[sortBy] || 0
      let bValue = b[sortBy] || 0
      
      if (sortOrder === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }, [stockData, sortBy, sortOrder])

  if (loading && !stockData.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading stock data: {error}</p>
        </div>
      </div>
    )
  }

  const topStocks = sortedData.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Market Summary Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Top Stocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topStocks.map((stock) => (
            <MarketCard key={stock.id} asset={stock} type="stock" />
          ))}
        </div>
      </div>

      {/* 3D Visualization and Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart3D data={sortedData} title="Stock Market Cap 3D Visualization" />
        <Watchlist compact />
      </div>

      {/* All Stocks */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          All Stocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedData.map((stock) => (
            <MarketCard key={stock.id} asset={stock} type="stock" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StocksPage