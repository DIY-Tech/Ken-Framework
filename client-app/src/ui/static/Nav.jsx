import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav() {
    return(
        <nav className="nav">
            <ul className="nav__list">
            <li className="nav__list-item"><NavLink to="/" className="nav__link">Products</NavLink></li>
            <li className="nav__list-item"><NavLink to="/dist-login" className="nav__link">Distributor Login</NavLink></li>
            <li className="nav__list-item"><NavLink to="/" className="nav__link"><i class="fas fa-shopping-cart"></i>Cart</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;