import React, { useContext, useState, useEffect } from 'react';
import {AppContext} from '../../../../App';

function ProductColor() {
    const { accountData, dispatch, currentProduct } = useContext(AppContext);
    const [colors, setColors] = useState([]);
    useEffect(() => {
        fetch("http://site1/server.php?controller=color&action=getAll")
        .then(res => res.json())
        .then(res => {
            if(res.status === 'success') {
                setColors(res.data);
            }
        })
    }, []);
    function toggleColor(e) {
        
    }
    return(
        <main>
            <div>
                <form>
                    <h2>Product Colors</h2>
                    <div>
                        {colors.map(color => (
                            <div>
                                <label htmlFor={color.colorId}>
                                    <input id={color.colorId} value={color.colorId} onChange={toggleColor} type="checkbox"/>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button type="button">Add</button>
                    </div>
                </form>
            </div>
        </main>
    );
}