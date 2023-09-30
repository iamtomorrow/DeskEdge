import { useEffect, useState } from 'react'

import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Login } from './components/Login/Login';

function App() {
  
  const [ user, setUser ] = useState(null);

  /* useEffect(() => {
    if ( !user ) {
      window.location.href = "/Login";
    }
  }, []) */

  return (
    <div className='App'>
      <Sidebar />
    </div>
  )
}

export default App
