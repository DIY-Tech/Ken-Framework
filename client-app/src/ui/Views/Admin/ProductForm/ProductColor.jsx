import React, { useContext, useState, useEffect } from 'react';
import {AppContext} from '../../../../App';

function ProductColor() {
    const { accountData, dispatch, currentProduct } = useContext(AppContext);
    const [selectedColors, setSelectedColors] = useState([]);
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
        let colorId = e.target.value;
        let index = selectedColors.indexOf(colorId);
        if (index > -1) {
            selectedColors.splice(index, 1);
        } else {
            setSelectedColors([...selectedColors, colorId]);
        }
    }

    function addColors() {
        selectedColors.forEach(colorId => {
            fetch('http://site1/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                controller: "color",
                action: 'link',
                payload: {
                  colorId: colorId,
                  productId: currentProduct.productId,
                  apiToken: accountData.apiToken
                }
            })
        })
        .then(res => res.json())
        .then(res => {
                if (res.status === "success") {
                        
                }
            })
        }
        )}

        
    return(
        <main>
            <div className="color__container">
                <form className="color__form">
                    <h2 className="color__heading">Product Colors</h2>
                    <div className="color__list">
                        {colors.map(color => (
                            <div className="color__item" key={color.colorId}>
                                <input className="color__input" id={color.colorId} value={color.colorId} onChange={toggleColor} type="checkbox"/>
                                <label className="color__label" htmlFor={color.colorId}>{color.colorName}</label>
                                <div className="color__square" style={{backgroundColor: color.colorHex, height: "40px", width: "40px", display: "inline-block", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="color__button-container">
                        <button className="color__button" type="button" onClick={addColors}>Add Selected</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ProductColor;