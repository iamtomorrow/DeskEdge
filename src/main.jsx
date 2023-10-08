import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ProtectedRoute } from './assistant/routeHandler.jsx'

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
        <Route path='/' element={ 
          
            <App /> 
         } />
        <Route path='/Login' element={ <Login /> } />
        <Route path='/dashboard' element={ 
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
         } />
        <Route path='/checkout' element={ 
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
         } />
        <Route path='/inventory' element={ 
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
         } />
        <Route path='/register' element={ 
          <ProtectedRoute>
            <Resgiter />
          </ProtectedRoute>
         } />
        <Route path='/sales' element={ 
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
         } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
