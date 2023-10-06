
import { useEffect, useState } from "react";

import { Header } from "../Header/Header"
import { SaleCard } from "../SaleCard/SaleCard";
import { Sidebar } from "../Sidebar/Sidebar"

import Cookies from "js-cookie";

import './styles.css';
import { API } from "../../api/Auth";

export const Sales = ( ) => {
    const [ id, setId ] = useState(Cookies.get("id"));
    const [ list, setList ] = useState([]);

    useEffect(() => {
        const getSales = async ( ) => {
            let _data = await API.getSales( id );
            setList(_data);
            console.log("sales: ", list);
        }
        getSales();
    }, []);

    return (
        <div className="App">
            <Sidebar />
            <div className="sales--container">
                <Header label={"Sales"} />
                <div className="sales-cards--container">
                    { list &&
                        list.map(item => (
                            <SaleCard date={ item.date } total={ item.total } products={ item.products } />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
