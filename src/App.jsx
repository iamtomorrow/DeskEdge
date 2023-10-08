import { useEffect, useState } from 'react'

import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'

import Cookies from 'js-cookie';
import { API } from './api/Auth';
import { Navigate } from 'react-router-dom';

function App() {

  const [ token, setToken ] = useState(Cookies.get("token"));
  const [ id, setId ] = useState(Cookies.get("id"));

  const [ user, setUser ] = useState();

  /* useEffect(() => {
    if ( token === null ) {
      window.location.href = "/Login";
    } else {
      getMe();
    }
  }, []) */

  useEffect(( ) => {
    if ( token === undefined || token === null ) {
      window.location.href = "/Login";
    } else {
      getMe();
    }
  }, []);

  const getMe = async ( ) => {
    if (id) {
      let data = await API.getMe(id);
      setUser(data);
    }
  }

  return (
    <div className='App'>
      { token === null &&
        <p>Login</p>
      }
      { token !== null && token !== undefined &&
        <>
          <Sidebar user={ user ? user : "" } />
          <div>
            App
          </div>
        </>
      }
    </div>
  )
}

export default App
