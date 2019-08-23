import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../../../App';
import Service from '../../../../services/service';

function ViewDistributors({history}) {
    const { accountData, dispatch } = useContext(AppContext);
    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        getAccounts();
    },[]);

    function getAccounts() {
        console.log('getting accounts');
        fetch(Service.domain + '?controller=account&action=getAll&apiToken=' + accountData.apiToken + "&accountType=" + accountData.accountType)
        .then(res => res.json())
        .then(res => {
            setAccounts(res.data);
        })
    }

    function deleteAccount(e) {
        fetch(Service.domain, {
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
            dispatch({type: 'updateNotification', data: {open: true, status: res.status, message: res.message}});
            if(res.status === "success") {
                getAccounts();
            }
        })
    }

    function editAccount(e) {
        fetch("http://site1/server.php?controller=account&action=getOne&apiToken=" + accountData.apiToken + "&accountType=" + accountData.accountType + "&accountId=" + e.target.value)
        .then(res =>  res.json())
        .then(res => {
            if(res.status === "success") {
                dispatch({type: "updateCurrentAccount", data: {...res.data, currentAccountEditing: true}});
                history.push("/Add-Distributor");
            }
        })
    }
    
    return(
    <main>
        <div className="adist__heading-container">
            <h1 className="adist__heading">All Distributors</h1>
        </div>
        <section className="adist__accounts-container">
            {accounts ? accounts.map(account => (
                <div key={account.accountId} className="adist__account-container">
                    <h3 className="adist__account-heading">{account.accountEmail}</h3>
                    <span className="adist__account-type">Account Type: {account.accountType}</span>
                    <div className="adist__account-disc">Discount: {account.accountDiscount}</div>
                    <div className="adist__button-container">
                        <button className="adist__button" type="button" value={account.accountId} onClick={editAccount}>Edit</button>
                        <button className="adist__button" type="button" value={account.accountId} onClick={deleteAccount}>Delete</button>
                    </div>
                </div>
            )): ''}
        </section>
    </main>);
}

export default ViewDistributors;