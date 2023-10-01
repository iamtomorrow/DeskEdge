
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

import './styles.css';

export const Dashboard = ( ) => {
    return (
        <div className="App">
            <Sidebar />
            <div className="dashboard--container">
                <Header label={"Dashboard"} />
                <div className="dashboard-bar--container">
                    <header className="dashboard-header--container">

                    </header>

                    <div className="dashboard-body--container">
                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">

                            </div>
                        </section>

                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">

                            </div>
                        </section>

                        <section className="dashboard-section financial-section">
                            <div className="dashboard-inner-section">

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
