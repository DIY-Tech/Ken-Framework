import React, {useState, useContext} from 'react';
import { AppContext } from '../../../App';
import { Redirect } from 'react-router-dom';

function Login() {

    const {dispatch, accountData} = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emessage, setEmessage] = useState("");
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function validation() {
        if (email === "" || password === "") {
            setEmessage("Please fill in both fields");
            return false;
        } else if (!email.match(emailFormat)) {
            setEmessage("Please enter a valid email")
            return false;
        } else {
            setEmessage("");
            return true;
        }
    }

    function login() {
        if (validation()) {
            fetch("http://site1/server.php", {
            method:"POST",
            headers: {"Accept":"application/json", "Content-Type":"application/json"},
            body: JSON.stringify({
                controller: "account",
                action: "accountLogin",
                payload: {
                    accountEmail: email,
                    accountPassword: password
                }
            })
        }).then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                let data = res.data;
                data.isLoggedIn = true;
                dispatch({type: "updateAccountData", data: res.data});
            } else {
                setEmessage("Your email or password was invalid");
            }
        }); 
        }
    }

    if(accountData.isLoggedIn) {
        if (accountData.accountType === "admin") {
        return <Redirect to="/admin-dashboard" />
    } if (accountData.accountType === "dist") {
        return <Redirect to="/products" />
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
                    <button type="submit" onClick={login} className="login__submit-button">Login</button>
                    <a href="/" className="login__application-link">Apply here for Distributor Access</a>
                </div>
            </div>
        </main>
    );
};

export default Login;