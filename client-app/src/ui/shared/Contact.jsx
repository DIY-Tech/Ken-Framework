import React from 'react';

function Contact() {
    return(
        <div className="contact__container">
            <div className="contact__map-container">
            <iframe className="contact__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d723.7539209428606!2d-112.04543047074685!3d43.4811430718023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5354593fb46301ab%3A0xbdf3fa29dd00c3e3!2s570+W+19th+St%2C+Idaho+Falls%2C+ID+83402!5e0!3m2!1sen!2sus!4v1566257648505!5m2!1sen!2sus"></iframe>
            </div>
            <div className="contact__info-container">
                <ul className="contact__info-list">
                    <li className="contact__info-list-item"><i className="fas fa-phone-square contact__icon"></i><a className="contact__link" href="tel:801-368-2960">Phone</a></li>
                    <li className="contact__info-list-item"><i className="fas fa-envelope contact__icon"/><a className="contact__link" href="orders@flatratemetal.com">Email</a></li>
                    <li className="contact__info-list-item"><i className="fab fa-facebook-square contact__icon"></i><a className="contact__link" href="https://www.facebook.com/floodandfiresolutions/">Facebook</a></li>
                    <li className="contact__info-list-item"><i className="fab fa-youtube contact__icon"/><a className="contact__link" href="https://www.facebook.com/floodandfiresolutions/">YouTube</a></li>
                    <li className="contact__info-list-item"><i className="fab fa-instagram contact__icon"/><a className="contact__link" href="https://www.facebook.com/floodandfiresolutions/">Instagram</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;