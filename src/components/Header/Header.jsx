
import './styles.css';

export const Header = ( { label } ) => {
    return (
        <div className="header--container">
            <p className='header-title'>{ label }</p>
        </div>
    )
}
