
import { useState } from "react";
import { Header } from "../Header/Header"
import { InventoryItem } from "../InventoryItem/InventoryItem";
import { Sidebar } from "../Sidebar/Sidebar"

import './styles.css';

export const Inventory = ( ) => {
    const [ inventory, setInventory ] = useState();

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
                                <p>Category</p>
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
                        <InventoryItem />
                        <InventoryItem />
                    </div>
                </div>
            </div>
        </div>
    )
}
