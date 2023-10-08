
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

    const [ day, setDay ] = useState( );
    const [ month, setMonth ] = useState( );
    const [ year, setYear ] = useState( );
    const [ timestamp, setTimestamp ] = useState();
    const [ date, setDate ] = useState();
    const [ loading, setLoading ] = useState(false);

    useEffect(( ) => {
        let thisDate = new Date(Date.now());
        setDay(thisDate.getDay() + 1);
        setMonth(thisDate.getMonth() + 1);
        setYear(thisDate.getFullYear());
    }, []);

    useEffect(( ) => {
        let dateStr = (`${year}-${month}-${day}`);
        // console.log(dateStr);

        let _date = new Date(dateStr);
        const _timestamp = _date.getTime();
        setTimestamp(_timestamp);

    }, [ day, month, year ]);

    useEffect(() => {
        const getSales = async ( ) => {
            setLoading(true);
            let _data = await API.getSales( id, timestamp );
            setLoading(false);

            if (_data === null) {
                alert("!");
            } else {
                setList(_data.reverse());
            }
        }
        getSales();
    }, [ timestamp ]);

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                  21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const years = [2023];

    return (
        <div className="App">
            <Sidebar />
            <div className="sales--container">
                <Header label={"Sales"} />
                <div className="filter--container">
                    <div className="filter-inner--container">
                        <div className="date-container">
                            <div className="date-section">
                                <select className="date-day">
                                <option onClick={ () => setDay()}>{ day }</option>
                                    { days &&
                                        days.map((item) => (
                                            <option onClick={ () => setDay(item)}>{ item }</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="date-section">
                                <select className="date-month">
                                <option onClick={ () => setMonth()}>{ month }</option>
                                    { months &&
                                        months.map((item) => (
                                            <option onClick={ () => setMonth(item)}>{ item }</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="date-section">
                                <select className="date-month">
                                <option onClick={ () => setYear()}>{ year }</option>
                                    { years &&
                                        years.map((item) => (
                                            <option onClick={ () => setYear(item)}>{ item }</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="date-info--container">
                            { date }
                        </div>
                    </div>
                </div>
                <div className="sales-cards--container">
                    { list &&
                        list.map((item, index) => (
                            <SaleCard key={ index }
                                date={ item.date } 
                                total={ item.total } 
                                products={ item.products }
                                payment_method={ item.payment_method } 
                                opacity={ loading ? 0.5 : 1} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
