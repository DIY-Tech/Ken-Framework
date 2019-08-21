import React, { useState } from 'react';

function ProductForm() {
    
    const [name, setName] = useState("");
    

    function addProduct() {
        console.log("I exist!!");
    }

    return(
        <main>
            <form>
                <h2>Add New Product</h2>
                <div>
                    <label htmlFor="">Name:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Price:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Material:</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Category:</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Type:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Description:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Dimensions:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Bundle Type</label>
                    <select name="" id="">
                        <option value="single">Single</option>
                        <option value="box">Box</option>
                        <option value="bundle">Bundle</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Bundle Count:</label>
                    <input type="number" min="1"/>
                </div>
                <div>
                    <label htmlFor="">Pallet Count:</label>
                    <input type="number" min="1"/>
                </div>
                <div>
                    <label htmlFor="">Weight:</label>
                    <input type="number" min="1"/>
                </div>
                <div>
                    <button type="button" onClick={addProduct}>Add Product</button>
                </div>
            </form>
        </main>
    );
};

export default ProductForm;