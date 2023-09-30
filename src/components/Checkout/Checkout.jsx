
import { useState } from "react";
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"

import './styles.css';

export const Checkout = ( { operator } ) => {

    const [ total, setTotal ] = useState('0');

    return (
        <div className="App">
            <Sidebar />
            <div className="checkout--container">
                <Header label={"Checkout"} />
                <div className="checkout-bar--container">
                    <div className="checkout-bar-left--container">

                    </div>
                    <div className="checkout-bar-right--container">
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
                                        <div className="payment-item">
                                            <input type="checkbox" className="checkbox-input" />
                                            <p className="payment-item-p">Cash</p>
                                        </div>
                                        <div className="payment-item">
                                            <input type="checkbox" className="checkbox-input" />
                                            <p className="payment-item-p">Card</p>
                                        </div>
                                        <div className="payment-item">
                                            <input type="checkbox" className="checkbox-input" />
                                            <p className="payment-item-p">PIX</p>
                                        </div>
                                        <div className="payment-item">
                                            <input type="checkbox" className="checkbox-input" />
                                            <p className="payment-item-p">PayPal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <footer className="payment-bar-footer--container">
                                <div className="checkout-info--container">
                                    <h1 className="checkout-info-h1">Total</h1>
                                    <h1 className="checkout-info-h1">R$ { total }</h1>
                                </div>
                                <div className="checkout-submit--container">
                                    <button className="checkout-submit-button">Confirm</button>
                                </div>
                            </footer>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
