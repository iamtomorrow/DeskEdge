import { useEffect, useState } from 'react'

import './App.css'
import favicon from '../public/images/icons/edge-favicon.ico';

import { Sidebar } from './components/Sidebar/Sidebar'

import Cookies from 'js-cookie';
import { API } from './api/Auth';

import { GraphColumn } from './components/GraphColumn/GraphColumn';

function App() {
  const [ name, setName ] = useState(localStorage.getItem("name"));
  const [ email, setEmail ] = useState(localStorage.getItem("email"));
  const [ logo, setLogo ] = useState(localStorage.getItem("logo"));

  const [ token, setToken ] = useState(Cookies.get("token"));
  const [ id, setId ] = useState(Cookies.get("id"));
  const [ user, setUser ] = useState();

  const [ total, setTotal ] = useState(0);
  const [ amount, setAmount ] = useState(0);
  const [ paymentMethods, setPaymentMethods ] = useState([]);

  const [ bestSellers, setBestSellers ] = useState([]);

  useEffect(( ) => {
    const getSalesAnalytics = async ( ) => {
      await API.getSalesAnalytics( id );
    }
    getSalesAnalytics();
  })

  useEffect(( ) => {
      document.title = `Edge | ${name}`;
      let link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
      link.href = favicon;

  }, []);

  useEffect(( ) => {
    const getAllProducts = async ( ) => {
      await API.getAllProducts( id );
    }
    getAllProducts();
  }, [])

  useEffect(( ) => {
      const getTotalSales = async ( ) => {
          let data = await API.getTotalSales( id );
          console.log(data);
          setTotal(data.total);
          setAmount(data.amount);
          setPaymentMethods(data.payment_methods);
      }
      getTotalSales( );
  }, []);

  useEffect(( ) => {
    if ( token === undefined || token === null ) {
      window.location.href = "/Login";
    } else {
      getMe();
    }
  }, []);

  useEffect(( ) => {
    getBestSellers();
  }, []);

  const getMe = async ( ) => {
    if (id) {
      let data = await API.getMe(id);
      setUser(data);
    }
  }

  const getBestSellers = async ( ) => {
    let _data = await API.getBestSellers( id );
    setBestSellers(_data);
  }

  return (
    <div className='App'>
      { token === null &&
        <p>Login</p>
      }
      { token !== null && token !== undefined &&
        <>
          <Sidebar user={ user ? user : "" } />
          <div className='home--container'>
            <div className='home-inner--container'>
            <section className='user-section--container' >
                <div className='user-logo--container'>
                    <img src={logo} className='user-logo' />
                </div>
                <div className='user-section-right--container'> 
                    <p id='user-name'>{ name }</p>
                    <p id='user-email'>{ email }</p>
                </div>
            </section>

            <div className="dashboard-body--container">
              <div className='dashboard-body-inner--container'>
                <section className="dashboard-section financial-section">
                    <div className="dashboard-inner-section">
                        <header className="dashboard-header--container">
                            <h2 className="dashboard-header-title">Sales</h2>
                        </header>
                        <div className="dashboard-info-body--container">
                            <div className="dashboard-info--container">
                                <div className="graph--container">
                                    <GraphColumn height={ amount / 1000 } value={amount} />
                                </div>
                                <div className="graph-info--container">
                                    <h1 className="info--container-h1">R$ {amount.toFixed(2).replace(".", ",") }</h1>
                                    <p className="info--container-p">THIS MONTH</p>
                                </div>
                            </div>

                            <div className="dashboard-info--container">
                                <div className="graph--container">
                                    <GraphColumn height={ total } value={total} />
                                </div>
                                <div className="graph-info--container">
                                    <h1 className="info--container-h1">{ total }</h1>
                                    <p className="info--container-p">THIS MONTH</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-section financial-section">
                    <div className="dashboard-inner-section">
                      <header className="dashboard-header--container">
                        <h2 className="dashboard-header-title">Best Sellers</h2>
                      </header>

                      <div className="dashboard-info-body--container">
                            <div className="dashboard-info--container">
                                <div className="graph--container">
                                    { bestSellers &&
                                        bestSellers.map(item => (
                                          <GraphColumn height={ parseInt(item.outputs) } 
                                            value={item.outputs} />
                                        ))
                                    }
                                </div>
                                <div className="graph-info--container-row">
                                    { bestSellers &&
                                        bestSellers.map(item => (
                                          <>
                                            <div className='info-p--container'>
                                              <p className='info--container-p'>{ item.outputs }</p>
                                              <p className='info--container-p'>{ item.name }</p>
                                            </div>
                                          </>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-section financial-section">
                    <div className="dashboard-inner-section">
                      <div className='graph-info--container-row'>

                      </div>
                    </div>
                </section>
              </div>
            </div>  
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
