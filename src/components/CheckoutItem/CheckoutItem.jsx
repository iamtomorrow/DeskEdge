
import { useEffect, useState } from 'react';
import './styles.css';

import DeleteIcon from 'remixicon-react/DeleteBin7FillIcon';
import PercenteIcon from 'remixicon-react/PercentFillIcon';

export const CheckoutItem = ( { name, PCU, price, barcode, amount, handleDeleteClick, handleUpdateTotal } ) => {

    const [ quantity, setQuantity ] = useState();
    const [ selected, setSelected ] = useState('');
    const [ subtotal, setSubtotal ] = useState(0);

    useEffect(( ) => {
        console.log("amount: ", amount, " = ", "quant: ", quantity);
        if (quantity === 0) {
            handleDeleteClick( barcode );
        }
    }, [ quantity ])

    useEffect(( ) => {
        setQuantity(amount);
    }, [])

    const handleIncrementClick = ( ) => {
        setQuantity( quantity + 1 );
        setSubtotal( price );
    }
    const handleDecrementClick = ( ) => {
        if (quantity === 0) {
            handleDeleteClick( barcode );
        } else {
            setQuantity( quantity - 1 );
        }
        setSubtotal( price );
        handleUpdateTotal( subtotal );
    }

    return (
        <div className={`checkout-item--container`}
            onClick={ () => setSelected(selected === name ? "" : name) }>
            <div className='checkout-item-inner--container'>
                <div className='checkout-left--container'>
                    <DeleteIcon className='checkout-item-icon' 
                        onClick={ () => handleDeleteClick( barcode ) } />
                    <PercenteIcon className='checkout-item-icon' />
                </div>
                <div className='checkout-center--container'>
                    <div className='center-item'>
                        <p id='item-name'>{ name }</p>
                    </div>
                    <div className='center-item'>
                        <p id='item-pcu'>{PCU}</p>
                    </div>
                    <div className='center-item'>
                        <p id='item-price'>R$ {price}</p>
                    </div>
                </div>
                <div className='checkout-right--container'>
                    <div className='item-quantity--container'>
                        <button id='item-decrement-button' onClick={ handleDecrementClick }> 
                            -
                        </button>
                        <p id='item-quantity'>
                            { quantity }
                        </p>
                        <button id='item-increment-button' onClick={ handleIncrementClick }>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
