
import './styles.css';

import Logo from '../../../public/images/logo/deskedge-logo.png';
import { useState } from 'react';

export const Login = ( ) => {

    const [ name, setName ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ CEO, setCEO ] = useState('');
    const [ service, setService ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = ( ) => {
        alert("sd");
    }

    return (
        <div className="login--container">
            <div className="login-inner--container">
                <div className='login-header--container'>
                    <div className='logo--container'>
                        <img className='header-logo' src={ Logo } />
                    </div>
                </div>

                <div className="login-form--container">
                    <div className='login-form-header--container'>
                        <h2 className='login-form-header-title'>Create a Desk Edge Account</h2>
                        <p className='login-form-header-subtitle'>Register you business</p>
                    </div>

                    <form className='login-form' onSubmit={ handleLogin } >
                        <label className='login-form-label'>
                            <input type='text' placeholder='Business name' required className='login-form-input' />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' placeholder='Country' required className='login-form-input' />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' placeholder='Email' required className='login-form-input' />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' placeholder='CEO' required className='login-form-input' />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' placeholder='Service' required className='login-form-input' />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' placeholder='Password' required className='login-form-input' />
                        </label>
                        <button type='submit' className='submit-login-form-button'>
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
