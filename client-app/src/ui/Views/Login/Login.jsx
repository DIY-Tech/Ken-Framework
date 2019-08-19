import React, {useState} from 'react';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emessage, setEmessage] = useState("");
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function validation() {
        if (email === "" || password === "") {
            setEmessage("Please fill in both fields");
        } else if (!email.match(emailFormat)) {
            setEmessage("Please enter a valid email")
        } else {
            setEmessage("");
        }
    }

    return (
        <main>
            <div className="login">
                <div className="login-container">
                    <h1 className="login-title">Distributer Login</h1>
                    <section className="login__username-section">
                        <label htmlFor="username" className="login__username-title">Email</label>
                        <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} value={email} className="login__username-input" />
                    </section>
                    <section className="login__password-section">
                        <label htmlFor="password" className="login__password-title">Password</label>
                        <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} value={password} className="login__password-input" />
                    </section>
                    <span className="login__error-msg">{emessage}</span>
                    <button type="submit" onClick={validation} className="login__submit-button">Login</button>
                    <a href="/" className="login__application-link">Apply here for Distributor Access</a>
                </div>
            </div>
        </main>
    );
};

export default Login;