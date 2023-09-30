
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"

export const Dashboard = ( ) => {
    return (
        <div className="App">
            <Sidebar />
            <div className="dashboard--container">
                <Header label={"Dashboard"} />
                <div >
                    svfd
                </div>
            </div>
        </div>
    )
}
