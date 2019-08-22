import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../App';

function AddDistributor() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [discount, setDiscount] = useState('');
    const {accountData, currentAccount, dispatch} = useContext(AppContext);

    function registerDistributor() {
        if(email !== '' && password !== '' && password === confirmPassword ) {
            fetch('http://site1/server.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    controller: 'account',
                    action: 'create',
                    payload: {
                        accountEmail: email,
                        accountPassword: password,
                        accountDiscount: discount,
                        apiToken: accountData.apiToken,
                        accountType: accountData.accountType
                    }
                }),
            })
            .then(res => res.json())
            .then(res => {
                dispatch({type: 'updateNotification', data: {open: true, status: res.status, message: res.message}});
                console.log(res.message);
                if(res.status === "success") {
                }
            });
        }
    }

    function updateDistributor() {
            fetch('http://site1/server.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    controller: 'account',
                    action: 'update',
                    payload: {
                        accountId: currentAccount.accountId,
                        accountEmail: email,
                        accountPassword: password,
                        accountDiscount: discount,
                        apiToken: accountData.apiToken,
                        accountType: accountData.accountType
                    }
                }),
            })
            .then(res => res.json())
            .then(res => {
                if(res.status === "success") {
                    console.log(res.message);
                }
            });
    }

    useEffect(() =>{
        if(currentAccount.currentAccountEditing) {
            setEmail(currentAccount.accountEmail);
            setDiscount(currentAccount.accountDiscount);
        }
    }, []);

    return(
        <main>
            <div className="edist__container">
                <form className="edist__form">
                    <h2>{currentAccount.currentAccountEditing ? "Update" : "Edit"} Distributor</h2>
                    <div className="edist__input-container">
                        <label className="edist__input-label" htmlFor="">Distributor Email</label>
                        <input className="edist__input" defaultValue={email} onChange={e => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div className="edist__input-container">
                        <label className="edist__input-label" htmlFor="">Distributor Password</label>
                        <input className="edist__input" defaultValue={password} onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>
                    <div className="edist__input-container">
                        <label className="edist__input-label" htmlFor="">Confirm Password</label>
                        <input className="edist__input" defaultValue={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password"/>
                    </div>
                    <div className="edist__input-container">
                        <label className="edist__input-label" htmlFor="">Distributor Discount</label>
                        <input className="edist__input" defaultValue={discount} onChange={e => setDiscount(e.target.value)} type="number" min="0" max="1" step="0.01"/>
                    </div>
                    <div className="edist__button-container">
                        {currentAccount.currentAccountEditing 
                        ? <button className="edist__button-container" type="button" onClick={updateDistributor}>Update Distributor</button>
                        : <button className="edist__button-container" type="button" disabled={email === "" || password === "" || confirmPassword !== password ? true : false} onClick={registerDistributor}>Register Distributor</button> }
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddDistributor;