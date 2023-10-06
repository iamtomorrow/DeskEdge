
import './styles.css';
import { ProductCard } from '../ProductCard/ProductCard';

export const SaleCard = ( { date, total, products } ) => {
    return (
        <div className="salecard--container">
            <header className='salecard-header--container'>
                <div className='salecard-inner-header--container'>  
                    <p className='salescard-date'>{ date }</p>
                    <p className='salescard-total'>R$ { total }</p>
                </div>
            </header>
            <div className='salecard-body--container'>
                
            </div>
        </div>
    )
}
