import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../../../App';

function ViewDistributors() {
    const { accountData } = useContext(AppContext);
    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        getAccounts();
    },[]);

    function getAccounts() {
        console.log('getting accounts');
        fetch('http://site1/server.php?controller=account&action=getAll&apiToken=' + accountData.apiToken + "&accountType=" + accountData.accountType)
        .then(res => res.json())
        .then(res => {
            setAccounts(res.data);
        })
    }

    function deleteAccount(e) {
        fetch("http://site1/server.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                controller: 'account',
                action: 'delete',
                payload: {
                    accountId: e.target.value,
                    accountType: accountData.accountType,
                    apiToken: accountData.apiToken
                }
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.status === "success") {
                console.log('accessed')
                getAccounts();
            }
        })
    }
    return(<main>
        <div>
            <h1>All accounts</h1>
        </div>
        <section>
            {accounts ? accounts.map(account => (
                <div key={account.accountId}>
                    <h3>{account.accountEmail}</h3>
                    <span>{account.accountType}</span>
                    <div>{account.accountDiscount}</div>
                    <div>
                        <button type="button" value={account.accountId}>Edit</button>
                        <button type="button" value={account.accountId} onClick={deleteAccount}>Delete</button>
                    </div>
                </div>
            )): ''}
        </section>
    </main>);
}

export default ViewDistributors;