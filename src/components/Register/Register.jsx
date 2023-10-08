
import './styles.css';

import { Sidebar } from "../Sidebar/Sidebar"
import { Header } from '../Header/Header';
import { useEffect, useState } from 'react';
import { API } from '../../api/Auth';
import Cookies from 'js-cookie';

import BarcodeLineIcon from 'remixicon-react/BarcodeLineIcon';

export const Resgiter = ( ) => {
    const [ id, setId ] = useState(Cookies.get("id"));

    const [ name, setName ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ discount, setDiscount ] = useState("");
    const [ finalPrice, setFinalPrice ] = useState("");
    const [ quantity, setQuantity ] = useState("");
    const [ SKU, setSKU ] = useState("");
    const [ barcode, setBarcode ] = useState("");

    useEffect(( ) => {
        setFinalPrice( parseFloat(price - (price * (discount / 100))).toFixed(2) );
    }, [price, discount]);

    useEffect(( ) => {
        const getAsyncScanned = async () => {
            let _scanned = await API.getAsyncScanned( id, setBarcode );
            setBarcode(_scanned);
        }
        getAsyncScanned();  
    }, []);

    useEffect(( ) => {
        const getProduct = async ( ) => {
            let prods = await API.getProduct( id, barcode );
            if (barcode.length === 12) {
                if (prods !== null) {
                    setName(prods.name);
                    setCategory(prods.category);
                    setPrice(parseFloat(prods.price).toFixed(2));
                    setDiscount(prods.discount);
                    setFinalPrice(parseFloat(prods.final_price).toFixed(2));
                    setQuantity(prods.quantity);
                    setSKU(prods.SKU);
                    setBarcode(prods.barcode);
                } else {
                    clearStates();
                }
            }
        }
        getProduct( );
    }, [ barcode ])

    const handleRegisterClick = async ( e ) => {
        e.preventDefault();
        let data = await API.registerProduct(id, name, price, discount, finalPrice, category, quantity, SKU, barcode);
        if (data !== null) {
            clearStates();
        } else {
            alert("!");
        }
    }

    const clearStates = ( ) => {
        setName("");
        setCategory("");
        setPrice("");
        setDiscount("");
        setFinalPrice("");
        setQuantity("");
        setSKU("");
        setBarcode("");
    }

    const handleGenerateBarcode = ( ) => { 
        setBarcode(Date.now().toString());
    }

    return (
        <div className="App">
            <Sidebar />
            <div className='register--container'>
                <Header label={"Register"} />
                <div className='register-form--container'>
                    <form className='register-form' onSubmit={ handleRegisterClick }>
                        <label className='form-label'>
                            <p className='label-p'>Name</p>
                            <input className='label-input' 
                                autoFocus 
                                type='text' 
                                required
                                value={name}
                                onChange={ (e) => setName(e.target.value)} />
                        </label>
                        <label className='form-label-row'>
                            <label className='form-label'> 
                                <p className='label-p'>Price</p>
                                <input className='label-input'  
                                    type='text' 
                                    required
                                    value={price} 
                                    onChange={ (e) => setPrice(parseFloat(e.target.value).toFixed(2))} />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Discount %</p>
                                <input className='label-input'  
                                    type='text' 
                                    required 
                                    value={discount}
                                    onChange={ (e) => setDiscount(e.target.value)} />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Final Price</p>
                                <input className='label-input'  
                                    type='text' 
                                    required 
                                    value={finalPrice ? finalPrice : ""} 
                                    onChange={(e) => e}/>
                            </label>
                        </label>
                        <label className='form-label-row'>
                            <label className='form-label'> 
                                <p className='label-p'>Category</p>
                                <input className='label-input'  
                                    type='text' 
                                    required
                                    value={category}
                                    onChange={ (e) => setCategory(e.target.value)} />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Quantity</p>
                                <input className='label-input'  
                                    type='number' 
                                    required
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} />
                            </label>
                        </label>
                        <label className='form-label'> 
                            <p className='label-p'>SKU</p>
                            <input className='label-input'  
                                type='text' 
                                required
                                value={SKU}
                                onChange={ (e) => setSKU(e.target.value) } />
                        </label>
                        <label className='form-label'> 
                            <p className='label-p'>UPC / BarCode</p>    
                            <div className='barcode-input'>
                            <input className='label-input'  
                                type='text' 
                                required
                                value={barcode}
                                onChange={ (e) => setBarcode(e.target.value)} />
                                <button id='generate-button' onClick={ handleGenerateBarcode }>
                                    <BarcodeLineIcon />
                                </button>
                            </div>
                        </label>
                        <button className='submit-register-form' type='submit'>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
