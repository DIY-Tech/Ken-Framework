import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../App';
import ProductImage from './ProductImage';
import { Link, Redirect } from 'react-router-dom';
import Service from '../../../../services/service';

function ProductForm({history}) {
    const { accountData, dispatch } = useContext(AppContext);
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://site1/server.php?controller=material&action=getAll')
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    setMaterials(res.data);
                }
            })
        fetch('http://site1/server.php?controller=category&action=getAll')
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    setCategories(res.data);
                }
            })
    }, [])


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [material, setMaterial] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [bundleType, setBundleType] = useState("");
    const [bundleCount, setBundleCount] = useState("");
    const [palletCount, setPalletCount] = useState("");
    const [weight, setWeight] = useState("");

    function addProduct(e) {
        if (
            name === "" || price === "" || material === "" || category === "" ) {
                e.preventDefault();
                return;
            }
        fetch(Service.domain, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                controller: "product",
                action: 'create',
                payload: {
                    productName: name,
                    productRetailPrice: price,
                    materialId: material,
                    categoryId: category,
                    productDescription: description,
                    productType: type,
                    productDimension: dimensions,
                    productBundleType: bundleType,
                    productBundleCount: bundleCount,
                    productPalletCount: palletCount,
                    productWeight: weight,
                    accountType: accountData.accountType,
                    apiToken: accountData.apiToken
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    dispatch({type: "updateCurrentProduct", data:{productId: res.data.id}});
                    history.push("/Add-Images");
                } else {
                    dispatch({type: "updateNotification", data:{open: true, status: res.status, message: res.message}});
                }
            })
    }

    return (
        <main>
            {console.log("rendered")}
            <div className="product__container">
            <form>
                    <h1 className="product__heading">Add New Product</h1>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Name*</label>
                        <input className="product__input" type="text" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Price*</label>
                        <input className="product__input" type="text" onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Material*</label>
                        <select className="product__input" name="" id="" onChange={e => setMaterial(e.target.value)}>
                            <option value="">- Select -</option>
                            {materials.map(mat => (
                                <option key={mat.materialId} value={mat.materialId}>{mat.materialName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Category*</label>
                        <select className="product__input" name="" id="" onChange={e => setCategory(e.target.value)}>
                            <option value="">- Select -</option>
                            {categories.map(cat => (
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Description</label>
                        <input className="product__input" type="text" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Type</label>
                        <input className="product__input" type="text" onChange={e => setType(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Dimensions</label>
                        <input className="product__input" type="text" onChange={e => setDimensions(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Bundle Type</label>
                        <select className="product__input" name="" id="" onChange={e => setBundleType(e.target.value)}>
                            <option value="">- Select -</option>
                            <option value="single">Default</option>
                            <option value="box">Box</option>
                            <option value="bundle">Bundle</option>
                        </select>
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Bundle Count</label>
                        <input className="product__input" type="number" min="1" onChange={e => setBundleCount(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Pallet Count</label>
                        <input className="product__input" type="number" min="1" onChange={e => setPalletCount(e.target.value)} />
                    </div>
                    <div className="product__section">
                        <label className="product__label" htmlFor="">Weight</label>
                        <input className="product__input" type="number" min="1" onChange={e => setWeight(e.target.value)} />
                    </div>
                    <p className="product__required">*required fields</p>
                    <button type="button" className="product__button" onClick={addProduct}>Next</button>
                </form>
            </div>
        </main>
    );
};

export default ProductForm;