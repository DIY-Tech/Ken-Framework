import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../App';

function AddDistributor() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [discount, setDiscount] = useState('');
    const {accountData} = useContext(AppContext);

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
                if(res.status === "success") {
                    console.log(res.data);
                }
            });
        }
    }

    return(
        <main>
            <div>
                <form action="">
                    <h2>Add Distributor</h2>
                    <div>
                        <label htmlFor="">Distributor Email</label>
                        <input defaultValue={email} onChange={e => setEmail(e.target.value)} type="email"/>
                    </div>
                    <div>
                        <label htmlFor="">Distributor Password</label>
                        <input defaultValue={password} onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <input defaultValue={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password"/>
                    </div>
                    <div>
                        <label htmlFor="">Distributor Discount</label>
                        <input defaultValue={discount} onChange={e => setDiscount(e.target.value)} type="number" min="0" max="1" step="0.01"/>
                    </div>
                    <div>
                        <button type="button" onClick={registerDistributor}>Register Distributor</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddDistributor;