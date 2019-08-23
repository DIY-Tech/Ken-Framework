import React, {useState, useContext} from 'react';
import { AppContext, dispatch } from '../../App';
import { useInterval } from '../../services/customHooks';

function Notification() {
    const {toggle, dispatch} = useContext(AppContext);
    useInterval(() => {
        dispatch({type: 'updateNotification', data:{open: false, message: '', status: ''}});
    }, 5000);
    return (
        <div className={`notification ${toggle.notification.status === 'success' ? 'notification--success' : 'notification--failure'}`}>
            <span className="notification__message">{toggle.notification.message}</span>
            <div className="notification__close" onClick={() => {dispatch({type: 'updateNotification', data:{open: false, message: '', status: ''}})}}><i className="fas fa-times"></i></div>
        </div>
    );
}

export default Notification;