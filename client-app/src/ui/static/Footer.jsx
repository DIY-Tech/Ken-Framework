import React from 'react';

function Footer() {
    return(
        <footer className="footer">
            <ul className="footer__fine-print">
                <li className="footer__fine-print-item">Copyright &copy; {new Date().getFullYear()}</li>
                <li className="footer__fine-print-seperator">|</li>
                <li className="footer__fine-print-item">Flat Rate Metal</li>
                <li className="footer__fine-print-seperator">|</li>
                <li className="footer__fine-print-item">All Rights Reserved</li>
            </ul>
        </footer>
    );
};

export default Footer;