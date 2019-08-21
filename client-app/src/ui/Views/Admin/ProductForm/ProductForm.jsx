import React, { useState, useEffect, useContext } from 'react';
import {AppContext} from '../../../../App';
import ProductImage from './ProductImage';

function ProductForm() {
    const{accountData} = useContext(AppContext);
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(
        () => {
            fetch('http://site1/server.php?controller=material&action=getAll')
            .then(res => res.json())
            .then(res => {
                if(res.status === "success") {
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
        },[]
    )
    

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
    
    function addProduct() {
        fetch('http://site1/server.php', {
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
                console.log(res.data);
            }
        })
    }

    return(
        <main>
            <form>
                <h2>Add New Product</h2>
                <div>
                    <label htmlFor="">Name:</label>
                    <input type="text" onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Price:</label>
                    <input type="text" onChange={e => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Material:</label>
                    <select name="" id="" onChange={e => setMaterial(e.target.value)}>
                        { materials.map(mat => (
                            <option key={mat.materialId} value={mat.materialId}>{mat.materialName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Category:</label>
                    <select name="" id="" onChange={e => setCategory(e.target.value)}>
                    { categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>
                <hr/>
                <div>
                    <label htmlFor="">Description:</label>
                    <input type="text" onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Type:</label>
                    <input type="text" onChange={e => setType(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Dimensions:</label>
                    <input type="text" onChange={e => setDimensions(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Bundle Type</label>
                    <select name="" id="" onChange={e => setBundleType(e.target.value)}>
                        <option value="single">Default</option>
                        <option value="box">Box</option>
                        <option value="bundle">Bundle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Bundle Count:</label>
                    <input type="number" min="1" onChange={e => setBundleCount(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Pallet Count:</label>
                    <input type="number" min="1" onChange={e => setPalletCount(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Weight:</label>
                    <input type="number" min="1" onChange={e => setWeight(e.target.value)}/>
                </div>
                <div>
                    <button type="button" onClick={addProduct}>Add Product</button>
                </div>
            </form>
            <ProductImage />
        </main>
    );
};

export default ProductForm;