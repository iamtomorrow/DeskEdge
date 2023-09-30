
import { Link } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';

export const SidebarItem = ( { icon, label } ) => {
    const [ labelName, setLabelName ] = useState('');

    useEffect(() => {
        setLabelName( window.location.pathname.substring(1) );
    }, []);

    return (
        <Link to={`/${label}`} className='link'>
            <div className={`sidebar-item--container ${label === labelName ? "sidebar-item--selected" : ""}`}>
                <div className="sidebar-item-icon">
                    { icon }
                </div>
                <div className="sidebar-item-label--container">
                    <p className="sidebar-label">{ label }</p>
                </div>
            </div>
        </Link>
    )
}
