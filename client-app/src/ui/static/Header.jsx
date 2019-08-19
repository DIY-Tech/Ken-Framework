import React from 'react';
import Nav from './Nav';

function Header() {

    // const [toggle, setToggle] = useState(false);

    // function toggleNav() {
    //     setToggle(!toggle);
    // }

    return (
        <header className="header">
            <div className="header__container">
                <a className="home__anchor" href="/">
                <i className="fas fa-home header__icon"></i>
                <span className="header__title">Flat Rate Metal</span>
                </a> 
            </div>
            <Nav />
        </header>

    );
}

export default Header;