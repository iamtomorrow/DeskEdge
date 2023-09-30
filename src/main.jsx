import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Checkout } from './components/Checkout/Checkout.jsx'
import { Dashboard } from './components/Dashboard/Dashboard.jsx'
import { Inventory } from './components/Inventory/Inventory.jsx'
import { Resgiter } from './components/Register/Register.jsx'
import { Sales } from './components/Sales/Sales.jsx'
import { Login } from './components/Login/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/Login' element={ <Login /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/checkout' element={ <Checkout /> } />
        <Route path='/inventory' element={ <Inventory /> } />
        <Route path='/register' element={ <Resgiter /> } />
        <Route path='/sales' element={ <Sales /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
