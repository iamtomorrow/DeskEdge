
import './styles.css';

import Logo from '../../../public/images/logo/deskedge-logo.png'

import DashboardIcon from 'remixicon-react/DashboardLineIcon';
import BarcodeIcon from 'remixicon-react/BarcodeLineIcon';
import AppsIcon from 'remixicon-react/AppsLineIcon';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import CartIcon from 'remixicon-react/ShoppingCart2FillIcon';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useEffect, useState } from 'react';

export const Sidebar = ( ) => {
    const [ name, setName ] = useState(localStorage.getItem("name"));
    const [ email, setEmail ] = useState(localStorage.getItem("email"));
    const [ logo, setLogo ] = useState(localStorage.getItem("logo"));

    const handleUserSectionClick = ( ) => {
        window.location.href = "/";
    }

    return (
        <div className="sidebar--container">
            <div className='sidebar-inner--container'>
                <header className='sidebar-header--container'>
                    <div className='logo--container'>
                        <img id='logo' src={ Logo } />
                    </div>
                </header>

                <div className='sidebar-body--container'>
                    <SidebarItem icon={ <DashboardIcon style={{width: 16}} /> } label={ "Dashboard"} />
                    <SidebarItem icon={ <BarcodeIcon style={{width: 16}} /> } label={"Register"} />
                    <SidebarItem icon={ <AppsIcon style={{width: 16}} /> } label={"Inventory"} />
                    <SidebarItem icon={ <CheckIcon style={{width: 16}} /> } label={"Sales"} />
                    <SidebarItem icon={ <CartIcon style={{width: 16}} /> } label={"Checkout"} />
                </div>

                <footer className='sidebar-footer--container'>
                    <section className='user-section--container' onClick={ handleUserSectionClick }>
                        <div className='user-logo--container'>
                            <img src={logo} className='user-logo' />
                        </div>
                        <div className='user-section-right--container'> 
                            <p id='user-name'>{ name }</p>
                            <p id='user-email'>{ email }</p>
                        </div>
                    </section>
                </footer>
            </div>
        </div>
    )
}
