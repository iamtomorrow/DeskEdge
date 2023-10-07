
import { useEffect, useState } from "react";
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"

import DeleteIcon from 'remixicon-react/DeleteBin7FillIcon';
import PercenteIcon from 'remixicon-react/PercentFillIcon';

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

    const [ quantity, setQuantity ] = useState();
    const [ selected, setSelected ] = useState('');

    const payments = [
        {name: "Cash", slug: "cash"},
        {name: "Card", slug: "card"},
        {name: "PIX", slug: "pix"},
        {name: "PayPal", slug: "paypal"},
    ]

    const handleGetProduct = async ( e ) => {
        e.preventDefault();

        let data = await API.getProduct( id, barcode );

        if (data !== null) {
            let key = list.findIndex(item => item.barcode === barcode);
            if (key === -1) {
                setList(prev => [...prev, {...data, amount: 1}]);
            } else {
                let _data = { ...list[key], amount: list[key].amount++ };
            }
        } else {
            alert("Product not found!");
        }
        setBarcode("");
    }

    useEffect(( ) => {
        let _id = Cookies.get("id");
        setId(_id);
    }, [])

    useEffect(( )  => {
        const getAsyncScanned = async () => {
            let _scanned = await API.getAsyncScanned( id, setBarcode );
            setBarcode(_scanned);
        }
        getAsyncScanned();  
    }, [])

    useEffect(( ) => {
        if (quantity === 0) {
            handleDeleteClick( barcode );
        }
    }, [ quantity ])

    useEffect(( ) => {
        updateTotal();
    }, [ list, quantity, barcode])

    const handleDeleteClick = ( _barcode ) => {
        setList(list.filter( (prod) => prod.barcode !== _barcode ));
    }

    const handleCheckoutClick = async ( ) => {
        if (paymentMethod !== "" && total !== 0) {
            await API.setCheckout(id, total, paymentMethod, list);
            console.log("...");
        }
    }

    const updateTotal = ( ) => {
        let sum = 0;
        list.forEach(item => {
            sum += item.price * item.amount;
        })
        setTotal(sum);
    }

    const handleDecrementClick = ( _barcode ) => {
        list.forEach(prod => {
            if (prod.barcode === _barcode) {
                prod.amount --;
            }
        })
        updateTotal();
    }
    const handleIncrementClick = ( _barcode ) => {
        list.forEach(prod => {
            if (prod.barcode === _barcode) {
                prod.amount ++;
            }
        })
        updateTotal();
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
                                    <div className={`checkout-item--container`}
                                    onClick={ () => setSelected( selected ===  item.name ? "" :  item.name) }>
                                    <div className='checkout-item-inner--container'>
                                        <div className='checkout-left--container'>
                                            <DeleteIcon className='checkout-item-icon' 
                                                onClick={ () => handleDeleteClick(  item.barcode ) } />
                                            <PercenteIcon className='checkout-item-icon' />
                                        </div>
                                        <div className='checkout-center--container'>
                                            <div className='center-item'>
                                                <p id='item-name'>{ item.name }</p>
                                            </div>
                                            <div className='center-item'>
                                                <p id='item-pcu'>{ item.barcode}</p>
                                            </div>
                                            <div className='center-item'>
                                                <p id='item-price'>R$ { item.price}</p>
                                            </div>
                                        </div>
                                        <div className='checkout-right--container'>
                                            <div className='item-quantity--container'>
                                                <button id='item-decrement-button'
                                                    onClick={ ( ) => handleDecrementClick(item.barcode) }> 
                                                    -
                                                </button>
                                                <p id='item-quantity'>
                                                    { item.amount }
                                                </p>
                                                <button id='item-increment-button' 
                                                    onClick={ ( ) => handleIncrementClick(item.barcode) }>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    /* <CheckoutItem name={item.name} 
                                        PCU={ item.barcode } 
                                        price={ item.price } 
                                        amount={ item.amount }
                                        barcode={ item.barcode }
                                        handleDeleteClick={ handleDeleteItem } 
                                        handleUpdateTotal={ handleUpdateTotal } /> */
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
