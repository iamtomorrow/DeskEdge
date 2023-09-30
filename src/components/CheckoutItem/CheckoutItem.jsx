
import './styles.css';

export const CheckoutItem = ( { name, BarCode, price, quantity } ) => {
    return (
        <div className='checkoutitem--container'>
            <p>{name}</p>
            <p>{BarCode}</p>
            <p>{price}</p>
            <p>
                {quantity}
            </p>
        </div>
    )
}
