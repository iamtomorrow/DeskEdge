
import './styles.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect } from 'react';
import { useState } from 'react';

export const SaleCard = ( { date, total, products, payment_method, opacity } ) => {
    const [ day, setDay ] = useState();
    const [ month, setMonth ] = useState();
    const [ year, setYear ] = useState();

    useEffect(( ) => {
        let thisDate = new Date(date);
        setDay(thisDate.getDay());
        setMonth(thisDate.getMonth());
        setYear(thisDate.getFullYear());
    }, []);

    return (
        <div className="salecard--container" style={{ opacity: opacity }}>
            <div className='salecard-inner--container'>
            <header className='salecard-header--container'>
                <div className='salecard-inner-header--container'>  
                    <div className='salecard-left-header--container'>
                        <div className='salecard-left'>
                            <p className='salescard-date'>{ day + 1 }/{ month + 1 }/{ year }</p>
                            <p className='salescard-time'>{  }</p>
                        </div>
                        <div className='salecard-left'>
                            <p className='salescard-total'>R$ { total.toFixed(2) }</p>
                        </div>
                    </div>
                    <div className='salecard-right-header--container'>
                         <p className='salescard-payment'>Payment Method: </p>
                         <p className='salescard-payment-p'>{ payment_method }</p>
                    </div>
                </div>
            </header>
            <div className='salecard-body--container'>
                { products.map(item => (
                    <div className='salecard-product-section'>
                        <p className='salecard-product-section-name'>{ item.name }</p>
                        <p className='salecard-product-section-amount'>QNT: { item.amount }</p>
                    </div>
                ))
                }
            </div>
            </div>
        </div>
    )
}
