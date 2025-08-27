import React from 'react'
import { useSelector } from 'react-redux'
import MarketCard from '../components/MarketCard'
import Chart3D from '../components/Chart3D'
import Watchlist from '../components/Watchlist'

const CryptoPage = () => {
  const { cryptoData, loading, error } = useSelector(state => state.market)
  const { sortBy, sortOrder } = useSelector(state => state.ui)

  const sortedData = React.useMemo(() => {
    if (!cryptoData.length) return []
    
    return [...cryptoData].sort((a, b) => {
      let aValue = a[sortBy] || 0
      let bValue = b[sortBy] || 0
      
      if (sortOrder === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }, [cryptoData, sortBy, sortOrder])

  if (loading && !cryptoData.length) {
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
          <p className="text-red-500">Error loading crypto data: {error}</p>
        </div>
      </div>
    )
  }

  const topCryptos = sortedData.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Market Summary Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Top Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCryptos.map((crypto) => (
            <MarketCard key={crypto.id} asset={crypto} type="crypto" />
          ))}
        </div>
      </div>

      {/* 3D Visualization and Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart3D data={sortedData} title="Crypto Market Cap 3D Visualization" />
        <Watchlist compact />
      </div>

      {/* All Cryptocurrencies */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          All Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedData.map((crypto) => (
            <MarketCard key={crypto.id} asset={crypto} type="crypto" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CryptoPage