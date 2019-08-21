import React, {useState, useContext} from 'react';
import Nav from './Nav';
import { AppContext } from '../../App';

function Header() {

    const [toggle, setToggle] = useState(false);

    function toggleNav() {
        setToggle(!toggle);
    }

    return (
        <header className="header">
            <div className="header__container">
                <a className="home__anchor" href="/">
                <i className="fas fa-home header__icon"></i>
                <span className="header__title">Flat Rate Metal</span>
                </a>
                <div className="menu__container" onClick={toggleNav}>
                <span className={"nav__menu " + (toggle ? "open" : "")}></span> 
                </div>
            </div>
            <Nav toggleNav={toggleNav} boolean={toggle}/>
        </header>

    );
}

export default Header;