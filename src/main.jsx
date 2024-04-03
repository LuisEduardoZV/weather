import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import { MAIN_PATH } from './config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={MAIN_PATH}>
    <App />
  </BrowserRouter>
)
