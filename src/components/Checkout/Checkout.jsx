
import { useEffect, useState } from "react";
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"

import './styles.css';
import { API } from "../../api/Auth";
import Cookies from "js-cookie";

import { CheckoutItem } from "../CheckoutItem/CheckoutItem";

export const Checkout = ( ) => {
    const [ id, setId ] = useState(Cookies.get("id"));

    const [ total, setTotal ] = useState(0);
    const [ barcode, setBarcode ] = useState('');
    const [ list, setList ] = useState([]);

    const [ paymentMethod, setPaymentMethod ] = useState("");

    const handleGetProduct = async ( e ) => {
        e.preventDefault();

        let data = await API.getProduct( id, barcode );
        if (data !== null) {
            setList(prev => [...prev, data]);
            console.log("list: ", list);
        } else {
            alert("Product not found!");
        }
        setBarcode("");
    }

    useEffect(() => {
        let sum = 0;
        list.forEach( (prod) => {
            sum += parseFloat( prod.price );
        })
        setTotal( sum );
    }, [list])

    useEffect(( ) => {
        let _id = Cookies.get("id");
        setId(_id);
    })

    useEffect(( )  => {
        const getAsyncScanned = async () => {
            let _scanned = await API.getAsyncScanned( id, setBarcode );
            setBarcode(_scanned);
        }
        getAsyncScanned();  
    }, [])

    const payments = [
        {name: "Cash", slug: "cash"},
        {name: "Card", slug: "card"},
        {name: "PIX", slug: "pix"},
        {name: "PayPal", slug: "paypal"},
    ]

    const handleDeleteItem = ( _barcode ) => {
        setList(list.filter( (prod) => prod.barcode !== _barcode ));
        console.log("list: ", list);
    }

    const handleCheckoutClick = async ( ) => {
        if (paymentMethod !== "" && total !== 0) {
            await API.setCheckout(id, total, paymentMethod, list);
            console.log("...");
        }
    }

    return (
        <div className="App">
            <Sidebar />
            <div className="checkout--container">
                <Header label={"Checkout"} />
                <div className="checkout-bar--container">
                    <div className="checkout-bar-left--container">

                        <div className="product-list--container">
                            { list &&
                                list.map((item) => (
                                    <CheckoutItem name={item.name} 
                                        PCU={ item.barcode } 
                                        price={ item.price } 
                                        quantity={item.quantity}
                                        barcode={ item.barcode }
                                        handleDeleteClick={ handleDeleteItem } />
                                ))
                            }
                            {/* <p style={{ color: "#fff" }}>Barcode: { barcode }</p> */}
                        </div>
                        <form className="scanner--container"
                            onSubmit={ handleGetProduct }>
                            <div className="scanner-inner--container">
                                <input className="scanner-input" 
                                    autoFocus 
                                    type="text" 
                                    onChange={ (e) => setBarcode(e.target.value)} 
                                    value={ barcode } />
                                <button id="get-product-button" 
                                    type="submit" 
                                    onClick={ handleGetProduct }>Get Product
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="checkout-bar-right--container">
                        <div className="checkout-bar-inner-right--container">
                        <div className="payment-bar--container">
                            <header className="payment-bar-header--container">
                                <p className="payment-bar-title">Payment</p>
                            </header>

                            <div className="payment-bar-body--container">
                                <div className="payment-info--container">
                                    <div className="payment-info-header">
                                        <p className="payment-info-p">Payment Method</p>
                                    </div>
                                    <div className="payment-methods--container">
                                        { payments.map((item) => (
                                            <div className="payment-item" onClick={ () => setPaymentMethod( item.slug === paymentMethod ? "" : item.slug)}>
                                                <input type="checkbox" 
                                                    className="checkbox-input" 
                                                    checked={ paymentMethod === item.slug ? true : false} 
                                                    onChange={ () => {} } />
                                                    <span className="checkmark">
                                                    </span>
                                                <p className="payment-item-p">{ item.name }</p>
                                            </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <footer className="payment-bar-footer--container">
                                <div className="checkout-info--container">
                                    <h1 className="checkout-info-h1">Total</h1>
                                    <h1 className="checkout-info-h1">R$ { total }</h1>
                                </div>
                                <div className="checkout-submit--container">
                                    <button className="checkout-submit-button"
                                        onClick={ handleCheckoutClick }>Checkout</button>
                                </div>
                            </footer>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
