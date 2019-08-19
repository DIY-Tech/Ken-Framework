import React from 'react';

function Login() {
    return (
        <main>
            <div className="login">
                <div className="login-container">
                    <h1 className="login-title">Distributer Login</h1>
                    <section className="login__username-section">
                        <label htmlFor="username" className="login__username-title">Email</label>
                        <input type="email" placeholder="Enter Email" className="login__username-input" />
                    </section>
                    <section className="login__password-section">
                        <label htmlFor="password" className="login__password-title">Password</label>
                        <input type="password" placeholder="Enter Password" className="login__password-input" />
                    </section>
                    <button type="submit" className="login__submit-button">Login</button>
                    <a href="/" className="login__application-link">Apply here for Distributor Access</a>
                </div>
            </div>
        </main>
    );
};

export default Login;