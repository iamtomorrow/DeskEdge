
import './styles.css';

export const InventoryItem = ( { name, category, SKU, UPC, BarCode, price, final_price, max_discount, stock } ) => {
    return (
        <div className="inventory-item--container">
            <p>{ name }</p>
            <p>{ category }</p>
        </div>
    )
}
