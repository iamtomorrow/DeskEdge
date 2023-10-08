
import { useState } from 'react';
import './styles.css';

export const InventoryItem = ( { name, 
        category, 
        SKU, 
        barcode, 
        price, 
        final_price, 
        max_discount, 
        stock,
        outputs } ) => {
    const [ selected, setSelected ] = useState('');

    return (
        <div className={`inventory-items--container ${ selected === barcode ? "inventory-item--selected" : ""}`}
            onClick={ () => setSelected(barcode !== selected ? barcode : '') } >
            <div className='inventory-item-inner--container'>
                <div className='inventory-item'>
                    <p id='name-item'>{ name }</p>
                    <p id='category-item'>{ category }</p>
                </div>
                <p className='inventory-item'>{ SKU }</p>
                <p className='inventory-item'>{ barcode }</p>
                <p className='inventory-item'>R$ { parseFloat(price).toFixed(2) }</p>
                <p className='inventory-item'>{ max_discount }%</p>
                <p className='inventory-item'>R$ { final_price }</p>
                <p className='inventory-item'>{ stock }</p>
                <p className='inventory-item'>{ outputs }</p>
            </div>
            { selected === barcode &&
                <img className={`barcode-image ${selected === barcode ? "barcode-image--selected" : ""}`}
                src={`https://www.webarcode.com/barcode/image.php?code=${barcode}&type=C128B&xres=1&height=50&width=245&font=3&output=png&style=197`}
                 />
            }
        </div>
    )
}
