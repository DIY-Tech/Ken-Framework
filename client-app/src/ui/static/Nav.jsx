import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav({toggleNav, boolean}) {
    return(
        <nav className={"nav " + (boolean ? "open" : "")}>
            <ul className="nav__list">
            <li className="nav__list-item"><NavLink onClick={toggleNav} to="/" className="nav__link">Products</NavLink></li>
            <li className="nav__list-item"><NavLink onClick={toggleNav} to="/dist-login" className="nav__link">Distributor Login</NavLink></li>
            <li className="nav__list-item"><NavLink onClick={toggleNav} to="/" className="nav__link"><i className="fas fa-shopping-cart"></i>Cart</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;