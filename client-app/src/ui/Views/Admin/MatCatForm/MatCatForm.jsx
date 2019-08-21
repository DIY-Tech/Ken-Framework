import React, {useContext, useState} from 'react';

function MatCatForm() {
    const [materialName, setMaterialName] = useState('');
    const [categoryName, setCategoryName] = useState('');

    function AddMaterial() {
        if(materialName !== "") {
            fetch('http://site1/server.php', {
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
                if(res.status === "success") {

                }
            })
        }
    }

    function AddCategory() {
        if(categoryName !== "") {
            fetch('http://site1/server.php', {
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
                if(res.status === "success") {
                    
                }
            })
        }
    }

    return (
        <main>
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
            </section>
        </main>
    );
}

export default MatCatForm;