
import './styles.css';
import { Sidebar } from "../Sidebar/Sidebar"
import { Header } from '../Header/Header';
import { useEffect, useState } from 'react';

export const Resgiter = ( ) => {

    const [ price, setPrice ] = useState();
    const [ discount, setDiscount ] = useState();
    const [ finalPrice, setFinalPrice ] = useState();

    useEffect(( ) => {
        setFinalPrice( price - (price * (discount / 100)) )
    }, [price, discount])

    return (
        <div className="App">
            <Sidebar />
            <div className='register--container'>
                <Header label={"Register"} />
                <div className='register-form--container'>
                    <form className='register-form'>
                        <label className='form-label'>
                            <p className='label-p'>Name</p>
                            <input className='label-input' autoFocus type='text' required />
                        </label>
                        <label className='form-label-row'>
                            <label className='form-label'> 
                                <p className='label-p'>Price</p>
                                <input className='label-input'  type='text' required onChange={ (e) => setPrice(e.target.value)} />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Discount %</p>
                                <input className='label-input'  type='text' required onChange={ (e) => setDiscount(e.target.value)} />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Final Price</p>
                                <input className='label-input'  type='text' required value={finalPrice ? finalPrice : ""} />
                            </label>
                        </label>
                        <label className='form-label-row'>
                            <label className='form-label'> 
                                <p className='label-p'>Category</p>
                                <input className='label-input'  type='text' required />
                            </label>
                            <label className='form-label'> 
                                <p className='label-p'>Quantity</p>
                                <input className='label-input'  type='number' required />
                            </label>
                        </label>
                        <label className='form-label'> 
                            <p className='label-p'>SKU</p>
                            <input className='label-input'  type='text' required />
                        </label>
                        <label className='form-label'> 
                            <p className='label-p'>UPC / BarCode</p>
                            <input className='label-input'  type='text' required />
                        </label>
                        <button className='submit-register-form' type='submit'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
