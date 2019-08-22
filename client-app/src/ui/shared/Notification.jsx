import React, {useState, useContext} from 'react';
import { AppContext } from '../../App';

function Notification() {
    const {toggle, dispatch} = useContext(AppContext);
    return (
        <div style={{backgroundColor: toggle.notification.status === 'success' ? 'green' : 'red'}}>
            {toggle.notification.message} 
            <div onClick={() => {dispatch({type: 'updateNotification', data:{open: false, message: '', status: ''}})}}><i className="fas fa-times"></i></div>
        </div>
    );
}

export default Notification;