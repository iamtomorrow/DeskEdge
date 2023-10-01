import { useEffect, useState } from 'react'

import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'

import Cookies from 'js-cookie';
import { API } from './api/Auth';

function App() {

  const [ token, setToken ] = useState(Cookies.get("token"));

  useEffect(() => {
    if ( token === undefined || token === null ) {
      window.location.href = "/Login";
    } 
  }, [])

  return (
    <div className='App'>
      <Sidebar />
    </div>
  )
}

export default App
