import React, {useContext, useState} from 'react';
import { AppContext } from '../../../../App';
import Service from '../../../../services/service';

function MatCatForm() {
    const {dispatch} = useContext(AppContext);
    const [materialName, setMaterialName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('');

    function AddMaterial() {
        if(materialName !== "") {
            fetch(Service.domain, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    controller: "material",
                    action: 'create',
                    payload: {
                        materialName: materialName
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch({type: 'updateNotification', data: {open: true, status: res.status, message: res.message}});
                if(res.status === "success") {
                    materialName('');
                }
            })
        }
    }

    function AddCategory() {
        if(categoryName !== "") {
            fetch(Service.domain, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    controller: "category",
                    action: 'create',
                    payload: {
                        categoryName: categoryName
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch({type: 'updateNotification', data: {open: true, status: res.status, message: res.message}});
                if(res.status === 'success') {
                    categoryName('');
                }
            })
        }
    }

    function AddColor() {
        if(colorName !== "" && colorHex !== "") {
            fetch(Service.domain, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    controller: "color",
                    action: "create",
                    payload: {
                        colorName: colorName,
                        colorHex: colorHex
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch({type: 'updateNotification', data: {open: true, status: res.status, message: res.message}});
                if(res.status === "success") {
                    setColorHex('');
                    setColorName('');
                }
            })
        }
    }

    return (
        <main>
            <div className="matcat__container"></div>
            <h1>Add material or category</h1>
            <section>
                <form action="">
                    <h2>New Material</h2>
                    <div>
                        <label htmlFor="">Material Name</label>
                        <input value={materialName} onChange={e => setMaterialName(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <button type="button" onClick={AddMaterial}>Add</button>
                    </div>
                </form>
                <form action="">
                    <h2>New Category</h2>
                    <div>
                        <label htmlFor="">Category Name</label>
                        <input value={categoryName} onChange={e => setCategoryName(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <button type="button" onClick={AddCategory}>Add</button>
                    </div>
                </form>
                <form action="">
                    <h2>New Color</h2>
                    <div>
                        <label htmlFor="">Color Name</label>
                        <input value={colorName} onChange={e => setColorName(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Color Hex</label>
                        <input value={colorHex} onChange={e => setColorHex(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <button type="button" onClick={AddColor}>Add</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default MatCatForm;