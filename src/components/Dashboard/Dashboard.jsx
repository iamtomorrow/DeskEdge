
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

import './styles.css';
import { API } from "../../api/Auth";
import Cookies from "js-cookie";
import { GraphColumn } from "../GraphColumn/GraphColumn";

export const Dashboard = ( ) => {

    const [ id, setId ] = useState(Cookies.get("id"));
    const [ total, setTotal ] = useState(0);
    const [ amount, setAmount ] = useState(0);

    useEffect(( ) => {
        const getTotalSales = async ( ) => {
            let data = await API.getTotalSales( id );
            console.log(data);
            setTotal(data.total);
            setAmount(data.amount);
        }
        getTotalSales( );
    }, []);

    return (
        <div className="App">
            <Sidebar />
            <div className="dashboard--container">
                <Header label={"Dashboard"} />
                <div className="dashboard-bar--container">
                    <header className="dashboard-header--container">

                    </header>

                    <div className="dashboard-body--container">
                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">
                                <header className="dashboard-header--container">
                                    <h2 className="dashboard-header-title">Sales</h2>
                                </header>
                                <div className="dashboard-info-body--container">
                                    <div className="dashboard-graph--container">
                                        <div className="graph--container">
                                            <GraphColumn height={amount / 1000} />
                                        </div>
                                        <div className="graph--container">
                                            <GraphColumn height={total} />
                                        </div>
                                    </div>
                                    <div className="dashboard-side-info--container">
                                        <div className="dashboard-side-info">
                                            <p className="dashboard-side-p">R$ { amount.toFixed(2).replace(".", ",") }</p>
                                            <h1 className="dashboard-side-h1">
                                                Total Amount
                                            </h1>
                                        </div>
                                        <div className="dashboard-side-info">
                                            <p className="dashboard-side-p">{ total }</p>
                                            <h1 className="dashboard-side-h1">
                                                Total Sales
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">

                            </div>
                        </section>

                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
