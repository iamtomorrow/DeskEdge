
import { useState } from 'react';
import './styles.css';

import DeleteIcon from 'remixicon-react/DeleteBin7FillIcon';
import PercenteIcon from 'remixicon-react/PercentFillIcon';

export const CheckoutItem = ( { name, PCU, price, quantity } ) => {

    const [ selected, setSelected ] = useState('');
    
    const handleDeleteClick = ( ) => {

    }

    return (
        <div className={`checkout-item--container`}
        /* ${selected === name ? "checkout-item--container-selected " : ""} */
            onClick={ () => setSelected(selected === name ? "" : name)}>
            <div className='checkout-item-inner--container'>
                <div className='checkout-left--container'>
                    <DeleteIcon className='checkout-item-icon' onClick={ handleDeleteClick } />
                    <PercenteIcon className='checkout-item-icon' />
                </div>
                <div className='checkout-center--container'>
                    <div className='center-item'>
                        <p id='item-name'>{name}</p>
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
                        <button id='item-decrement-button'> 
                            -
                        </button>
                        <p id='item-quantity'>
                            { quantity }
                        </p>
                        <button id='item-increment-button'>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
