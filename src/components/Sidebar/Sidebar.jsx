
import './styles.css';

import Logo from '../../../public/images/logo/deskedge-logo.png'

import DashboardIcon from 'remixicon-react/DashboardLineIcon';
import BarcodeIcon from 'remixicon-react/BarcodeLineIcon';
import AppsIcon from 'remixicon-react/AppsLineIcon';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import CartIcon from 'remixicon-react/ShoppingCart2FillIcon';

import { SidebarItem } from '../SidebarItem/SidebarItem';

export const Sidebar = ( ) => {

    return (
        <div className="sidebar--container">
            <div className='sidebar-inner--container'>
                <header className='sidebar-header--container'>
                    <div className='logo--container'>
                        <img id='logo' src={ Logo } />
                    </div>
                </header>

                <div className='sidebar-body--container'>
                    <SidebarItem icon={ <DashboardIcon style={{width: 16}} /> } label={"Dashboard"} />
                    <SidebarItem icon={ <BarcodeIcon style={{width: 16}} /> } label={"Register"} />
                    <SidebarItem icon={ <AppsIcon style={{width: 16}} /> } label={"Inventory"} />
                    <SidebarItem icon={ <CheckIcon style={{width: 16}} /> } label={"Sales"} />
                    <SidebarItem icon={ <CartIcon style={{width: 16}} /> } label={"Checkout"} />
                </div>
            </div>
        </div>
    )
}
