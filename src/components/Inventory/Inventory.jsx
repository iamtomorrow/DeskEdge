
import { useEffect, useState } from "react";
import { Header } from "../Header/Header"
import { InventoryItem } from "../InventoryItem/InventoryItem";
import { Sidebar } from "../Sidebar/Sidebar"

import './styles.css';
import { API } from "../../api/Auth";
import Cookies from "js-cookie";

export const Inventory = ( ) => {
    const [ id, setId ] = useState(Cookies.get("id"));
    const [ inventory, setInventory ] = useState([]);

    useEffect(() => {
        const getProducts = async ( ) => {
            let data = await API.getProducts( id );
            setInventory(data);
        }
        getProducts();
    }, []);

    const handleItemClick = ( id ) => {
        alert(`dc`);
    }

    return (
        <div className="App">
            <Sidebar />
            <div className="inventory--container">
                <Header label={"Inventory"} />
                <div className="inventory-bar--container">
                    <div className="invertory-header--container">
                        <div className="inventory-inner-header--container">
                            <div className="header-item">
                                <p>Name</p>
                            </div>
                            <div className="header-item">
                                <p>SKU</p>
                            </div>
                            <div className="header-item">
                                <p>BarCode</p>
                            </div>
                            <div className="header-item">
                                <p>Price</p>
                            </div>
                            <div className="header-item">
                                <p>Max. Discount</p>
                            </div>
                            <div className="header-item">
                                <p>Final Price</p>
                            </div>
                            <div className="header-item">
                                <p>Estoque</p>
                            </div>
                        </div>
                    </div>
                    <div className="inventory-item-list--container">
                        { inventory &&
                            inventory.map((item) => (
                                <InventoryItem name={ item.name } 
                                category={ item.category } 
                                SKU={ item.SKU } 
                                barcode={ item.barcode }
                                price={ item.price } 
                                final_price={ item.final_price }
                                max_discount={ item.discount }
                                stock={ item.quantity }
                                onClick={ handleItemClick } />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
