
import './styles.css';
import { ProductCard } from '../ProductCard/ProductCard';

export const SaleCard = ( { date, amount, products,  } ) => {
    return (
        <div className="salecard--container">
            <header className='salecard-header--container'>
                <div className='salecard-inner-header--container'>  
                    <p className='date'>{ date }</p>
                    <p className='amount'>R$ { amount }</p>
                </div>
            </header>
            <div className='salecard-body--container'>
                { products &&
                    products.map(( item ) => (
                        <ProductCard name={ item.name } quantity={ item.quantity } />
                    ))
                }
            </div>
        </div>
    )
}
