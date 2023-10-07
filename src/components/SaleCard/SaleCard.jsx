
import './styles.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect } from 'react';
import { useState } from 'react';

export const SaleCard = ( { date, total, products, payment_method } ) => {

    const [ day, setDay ] = useState();
    const [ month, setMonth ] = useState();
    const [ year, setYear ] = useState();

    useEffect(( ) => {
        let thisDay = new Date(date).getDate();
        let thisMonth = new Date(date).getMonth();
        let thisYear = new Date(date).getFullYear();
        setDay(thisDay);
        setMonth(thisMonth);
        setYear(thisYear);
    }, []);

    return (
        <div className="salecard--container">
            <header className='salecard-header--container'>
                <div className='salecard-inner-header--container'>  
                    <div className='salecard-left-header--container'>
                        <p className='salescard-date'>{ day }/{ month + 1 }/{ year }</p>
                        <p className='salescard-total'>R$ { total }</p>
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
    )
}
