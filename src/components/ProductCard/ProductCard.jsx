
import './styles.css';

export const ProductCard = ( { name, quantity } ) => {
    return (
        <div className="productcard--container">
            <p>{ name }</p>
            <p>QNT: { quantity }</p>
        </div>
    )
}