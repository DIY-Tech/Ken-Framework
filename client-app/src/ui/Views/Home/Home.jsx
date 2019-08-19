import React from 'react';
import Contact from '../../shared/Contact';

function Home() {
    return(
        <main>
            <div className="home__container">
                <h1 className="home__heading">FLAT RATE METAL</h1>
                <p className="home__tagline">Supplying Idaho Falls Since 2012</p>
            </div>
            <Contact />
        </main>
    );
};

export default Home