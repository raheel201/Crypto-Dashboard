import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setActiveTab } from '../features/uiSlice'
import { TrendingUp, DollarSign, Star, BarChart3 } from 'lucide-react'

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const watchlistCount = useSelector(state => state.watchlist.items.length)

  const navItems = [
    { path: '/crypto', label: 'Crypto', icon: TrendingUp, tab: 'crypto' },
    { path: '/stocks', label: 'Stocks', icon: DollarSign, tab: 'stocks' },
    { path: '/watchlist', label: 'Watchlist', icon: Star, tab: 'watchlist', badge: watchlistCount },
  ]

  const handleNavClick = (tab) => {
    dispatch(setActiveTab(tab))
  }

  return (
    <div className="bg-white dark:bg-gray-800 w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Market Dashboard
          </h1>
        </div>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.tab)}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar