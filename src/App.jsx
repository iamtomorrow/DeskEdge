import { useEffect, useState } from 'react'

import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'

import Cookies from 'js-cookie';
import { API } from './api/Auth';

function App() {

  const [ token, setToken ] = useState(Cookies.get("token"));
  const [ id, setId ] = useState(Cookies.get("id"));

  const [ user, setUser ] = useState();

  useEffect(() => {
    if ( token === undefined || token === null ) {
      window.location.href = "/Login";
    } else {
      getMe();
    }
  }, [])

  const getMe = async ( ) => {
    let data = await API.getMe(id);
    setUser(data);
  }

  return (
    <div className='App'>
      <Sidebar user={ user ? user : "" } />
    </div>
  )
}

export default App
