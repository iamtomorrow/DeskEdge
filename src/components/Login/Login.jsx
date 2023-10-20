
import './styles.css';

import Logo from '../../../public/images/logo/deskedge-logo.png';
import { useState } from 'react';
import { API } from '../../api/Auth';

export const Login = ( ) => {
    const [ switchForm, setSwitchForm ] = useState(false);

    const [ name, setName ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ CEO, setCEO ] = useState('');
    const [ service, setService ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async ( e ) => {
        e.preventDefault();

        if ( !switchForm ) {
            let data = await API.register(name, country, email, CEO, service, password);
            if (data === null)  {
                alert("!");
            } else {
                window.location.href = "/";
            }
        } else {
            let data = await API.access(email, password);
            if (data === null) {
                alert("!");
            } else {
                window.location.href = "/";
            }
        }
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
                        <p className='login-form-header-subtitle'>Register or access you business now.</p>
                    </div>

                    { switchForm === false &&
                    <form className='login-form' onSubmit={ handleLogin } >
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='Business name' 
                                required 
                                className='login-form-input'
                                value={ name }
                                onChange={ ( e ) => setName(e.target.value)}  />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='Country' 
                                required 
                                className='login-form-input'
                                value={ country }
                                onChange={ ( e ) => setCountry(e.target.value)} />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='Email' 
                                required 
                                className='login-form-input' 
                                value={ email }
                                onChange={ ( e ) => setEmail(e.target.value)} />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='CEO' 
                                required 
                                className='login-form-input'
                                value={ CEO }
                                onChange={ ( e ) => setCEO(e.target.value)}  />
                        </label>
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='Service' 
                                required 
                                className='login-form-input' 
                                value={ service }
                                onChange={ ( e ) => setService(e.target.value)} />
                        </label>
                        <label className='login-form-label'>
                            <input type='password' 
                                placeholder='Password' 
                                required 
                                className='login-form-input'
                                value={ password } 
                                onChange={ ( e ) => setPassword(e.target.value)} />
                        </label>
                        <label className='login-form-label'>
                            <p className='form-change-info'>Already have an account,</p>
                            <p className='form-change-info-link' onClick={ () => setSwitchForm(true) }>Access now.</p>
                        </label>
                        <button type='submit' className='submit-login-form-button'>
                            Continue
                        </button>
                    </form>
                    }
                    { switchForm === true &&
                    <form className='login-form' onSubmit={ handleLogin } >
                        <label className='login-form-label'>
                            <input type='text' 
                                placeholder='Email' 
                                required 
                                className='login-form-input'
                                value={ email }
                                onChange={ ( e ) => setEmail(e.target.value)} />
                        </label>
                        <label className='login-form-label'>
                            <input type='password' 
                                placeholder='Password' 
                                required 
                                className='login-form-input' 
                                value={ password }
                                onChange={ ( e ) => setPassword(e.target.value)}/>
                        </label>
                        <label className='login-form-label'>
                            <p className='form-change-info'>Don't have an account,</p>
                            <p className='form-change-info-link' onClick={ () => setSwitchForm(false) }>Register now.</p>
                        </label>
                        <button type='submit' className='submit-login-form-button'>
                            Continue
                        </button>
                    </form>
                    }
                </div>
            </div>
        </div>
    )
}
