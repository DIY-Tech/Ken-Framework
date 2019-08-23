import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../../../../App';
import Service from '../../../../services/service';

function MatCatForm() {
    const {dispatch} = useContext(AppContext);
    const [materialName, setMaterialName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('');

    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

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

    useEffect(() => {
        
        fetch(Service.domain + "?controller=color&action=getAll")
        .then(res => res.json())
        .then(res => {
            if(res.status === 'success') {
                setColors(res.data);
            }
        })

        fetch(Service.domain + "?controller=category&action=getAll")
        .then(res => res.json())
        .then(res => {
            if(res.status === 'success') {
                setCategories(res.data);
            }
        })

        fetch(Service.domain + "?controller=material&action=getAll")
        .then(res => res.json())
        .then(res => {
            if(res.status === 'success') {
                setMaterials(res.data);
            }
        })

    }, []);

    return (
        <main>
            <div className="matcat__container">
            <div className="matcat__heading">
                <h1>Manage Materials, Categories, and Colors</h1>
            </div>
            <section className="matcat__forms-container">
                <form className="matcat__form">
                    <h2 className="matcat__form-heading">New Material</h2>
                    <div className="matcat__labin-container">
                        <label className="matcat__label" htmlFor="">Material Name</label>
                        <input className="matcat__input" value={materialName} onChange={e => setMaterialName(e.target.value)} type="text"/>
                    </div>
                    <div className="matcat__button-container">
                        <button className="matcat__button" type="button" onClick={AddMaterial}>Add</button>
                    </div>
                    <div className="matcat__color-list">
                        {materials.map(material => (
                            <div className="matcat__color-item" key={material.materialId}>
                                <i className="matcat__icon fas fa-times-circle"></i>
                                <p className="matcat__color-name" htmlFor={material.materialId}>{material.materialName}</p>
                            </div>
                        ))}
                    </div>
                </form>
                <hr className="matcat__hr"/>
                <form className="matcat__form">
                    <h2 className="matcat__form-heading">New Category</h2>
                    <div className="matcat__labin-container">
                        <label className="matcat__label" htmlFor="">Category Name</label>
                        <input className="matcat__input" value={categoryName} onChange={e => setCategoryName(e.target.value)} type="text"/>
                    </div>
                    <div className="matcat__button-container">
                        <button className="matcat__button" type="button" onClick={AddCategory}>Add</button>
                    </div>
                    <div className="matcat__color-list">
                        {categories.map(category => (
                            <div className="matcat__color-item" key={category.categoryId}>
                                <i className="matcat__icon fas fa-times-circle"></i>
                                <p className="matcat__color-name" htmlFor={category.categoryId}>{category.categoryName}</p>
                            </div>
                        ))}
                    </div>
                </form>
                <hr className="matcat__hr"/>
                <form className="matcat__form">
                    <h2 className="matcat__form-heading">New Color</h2>
                    <div className="matcat__labin-container">
                        <label className="matcat__label" htmlFor="">Color Name</label>
                        <input className="matcat__input" value={colorName} onChange={e => setColorName(e.target.value)} type="text"/>
                    </div>
                    <div className="matcat__labin-container">
                        <label className="matcat__label" htmlFor="">Color Hex</label>
                        <input className="matcat__input" value={colorHex} onChange={e => setColorHex(e.target.value)} type="text"/>
                    </div>
                    <div className="matcat__button-container">
                        <button className="matcat__button" type="button" onClick={AddColor}>Add</button>
                    </div>
                    <div className="matcat__color-list">
                        {colors.map(color => (
                            <div className="matcat__color-item" key={color.colorId}>
                                <i className="matcat__icon fas fa-times-circle"></i>
                                <p className="matcat__color-name" htmlFor={color.colorId}>{color.colorName}</p>
                                <div className="matcat__color-square" style={{backgroundColor: color.colorHex}}></div>
                            </div>
                        ))}
                    </div>
                </form>
            </section>
            </div>
        </main>
    );
}

export default MatCatForm;