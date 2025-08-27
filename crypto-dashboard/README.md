# Crypto & Stock Market Dashboard

A modern, responsive web dashboard for tracking cryptocurrency and stock market data with stunning 3D visualizations.

## 🚀 Features

- **Real-time Market Data**: Live crypto prices from CoinGecko API and mock stock data
- **3D Visualizations**: Interactive 3D bar charts using Three.js
- **Watchlist System**: Add/remove assets with localStorage persistence
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Mobile-friendly layout with TailwindCSS
- **Redux State Management**: Centralized state with Redux Toolkit
- **Auto-refresh**: Market data updates every 30 seconds
- **Sorting & Filtering**: Sort by market cap, price change, or price

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React
- **Charts**: Recharts (optional)
- **Build Tool**: Vite
- **API**: CoinGecko API for cryptocurrency data

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-stock-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── DashboardLayout.jsx    # Main layout wrapper
│   ├── MarketCard.jsx         # Asset display cards
│   ├── Chart3D.jsx           # 3D visualization component
│   ├── Watchlist.jsx         # Watchlist management
│   ├── Sidebar.jsx           # Navigation sidebar
│   └── Topbar.jsx            # Top navigation bar
├── features/
│   ├── marketSlice.js        # Market data Redux slice
│   ├── watchlistSlice.js     # Watchlist Redux slice
│   └── uiSlice.js            # UI state Redux slice
├── hooks/
│   └── useFetchMarketData.js # Custom hook for data fetching
├── pages/
│   ├── CryptoPage.jsx        # Cryptocurrency dashboard
│   ├── StocksPage.jsx        # Stock market dashboard
│   └── WatchlistPage.jsx     # User watchlist page
├── store/
│   └── store.js              # Redux store configuration
├── App.jsx                   # Main app component
└── main.jsx                  # App entry point
```

## 🎯 Key Features Explained

### 3D Visualizations
- Interactive 3D bar charts showing market cap data
- Hover effects and smooth animations
- Color-coded bars (green for gains, red for losses)
- Orbital controls for rotation and zoom

### Watchlist System
- Click the star icon on any asset to add/remove from watchlist
- Persistent storage using localStorage
- Real-time price updates for watchlisted items
- Dedicated watchlist page with management options

### Market Data
- Live cryptocurrency data from CoinGecko API
- Mock stock data (easily replaceable with real API)
- Auto-refresh every 30 seconds
- Error handling and loading states

### Responsive Design
- Mobile-first approach with TailwindCSS
- Adaptive grid layouts
- Touch-friendly interactions
- Dark mode support

## 🔧 Configuration

### API Configuration
The app uses the CoinGecko API for cryptocurrency data. No API key required for basic usage.

For stock data, the current implementation uses mock data. To integrate real stock data:

1. Sign up for a stock market API (Alpha Vantage, IEX Cloud, etc.)
2. Update the `fetchStockData` thunk in `src/features/marketSlice.js`
3. Add your API key to environment variables

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_STOCK_API_KEY=your_stock_api_key_here
```

## 🎨 Customization

### Themes
The app supports light and dark themes. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      }
    }
  }
}
```

### 3D Visualizations
Modify the 3D charts in `src/components/Chart3D.jsx`:
- Change bar colors and materials
- Add new chart types (pie charts, globe, etc.)
- Adjust camera positions and lighting

## 📱 Mobile Support

The dashboard is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔮 Future Enhancements

- [ ] WebSocket integration for real-time streaming
- [ ] User authentication and cloud watchlist sync
- [ ] Advanced charting with candlestick patterns
- [ ] Portfolio tracking with P&L calculations
- [ ] Price alerts and notifications
- [ ] Historical data analysis
- [ ] Social sentiment integration
- [ ] Mobile app with React Native

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com) for cryptocurrency data
- [Three.js](https://threejs.org) for 3D graphics
- [TailwindCSS](https://tailwindcss.com) for styling
- [Redux Toolkit](https://redux-toolkit.js.org) for state management