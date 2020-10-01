import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav className='navbar'>
                <div className='links'>
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Oreder Review</Link>
                    <Link to="/inventory">Manage Inventory here</Link>
                    {loggedInUser.email? <Link onClick={() => setLoggedInUser({})}>Sign Out</Link> : <Link to="/login">Sign In</Link>}
                </div>
            </nav>
        </div>
    );
};

export default Header;