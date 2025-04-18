import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // <-- Make sure this is imported
import App from './App'
import './assets/css/bootstrap.min.css'
import './assets/css/animate.css'
import './assets/css/icons.css'
import './assets/css/sidebar-menu.css'
import './assets/css/app-style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* <-- This wrapper is crucial */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)