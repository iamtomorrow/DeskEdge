
import { Header } from "../Header/Header"
import { SaleCard } from "../SaleCard/SaleCard";
import { Sidebar } from "../Sidebar/Sidebar"

import './styles.css';

export const Sales = ( ) => {
    return (
        <div className="App">
            <Sidebar />
            <div className="sales--container">
                <Header label={"Sales"} />
                <div className="sales-cards--container">
                    <SaleCard />
                </div>
            </div>
        </div>
    )
}
