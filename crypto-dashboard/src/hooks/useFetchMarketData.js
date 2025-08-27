import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCryptoData, fetchStockData } from '../features/marketSlice'

export const useFetchMarketData = (autoRefresh = true, interval = 30000) => {
  const dispatch = useDispatch()
  const { loading, error, lastUpdated } = useSelector(state => state.market)

  const fetchData = useCallback(() => {
    dispatch(fetchCryptoData())
    dispatch(fetchStockData())
  }, [dispatch])

  useEffect(() => {
    // Initial fetch
    fetchData()

    if (autoRefresh) {
      const intervalId = setInterval(fetchData, interval)
      return () => clearInterval(intervalId)
    }
  }, [fetchData, autoRefresh, interval])

  return {
    loading,
    error,
    lastUpdated,
    refetch: fetchData
  }
}