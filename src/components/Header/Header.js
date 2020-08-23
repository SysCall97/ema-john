import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav className='navbar'>
                <div className='links'>
                    <a href="/shop">Shop</a>
                    <a href="/review">Oreder Review</a>
                    <a href="/manage">Manage Inventory here</a>
                </div>
            </nav>
        </div>
    );
};

export default Header;