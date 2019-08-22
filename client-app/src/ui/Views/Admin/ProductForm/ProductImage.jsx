import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';

function imageReducer(state, action) {
    switch (action.type) {
        case 'addImage':
            return [...state, action.data];
        default:
            throw new Error();
    }
}

function ProductImage() {

    const [previewImages, dispatch] = useReducer(imageReducer, []);
    const [images, setImages] = useState([]);
    const {accountData, currentProduct} = useContext(AppContext);

    function dragEnter(e) {
        console.log("enter")
        e.preventDefault();
        e.stopPropagation();
    }

    function dragOver(e) {
        console.log("over")
        e.preventDefault();
        e.stopPropagation();
    }

    function dragLeave(e) {
        console.log("leave")
        e.preventDefault();
        e.stopPropagation();
    }

    function drop(e) {
        console.log("drop")
        e.preventDefault();
        e.stopPropagation();
        let data = e.dataTransfer;
        let files = data.files;
        handleFiles(files);
    }


    function previewFile(file) {
        let imgSrc = URL.createObjectURL(file);
        console.log(imgSrc);
        addImageToPreview(imgSrc);
    }

    function addImageToPreview(img) {
        console.log(previewImages);
        dispatch({ type: 'addImage', data: img });
    }

    function handleFiles(files) {
        setImages([...images, ...files]);
        [...images, ...files].forEach(file => {
            previewFile(file);
        })
    }

    function uploadImages() {
        images.forEach(image => {
            let imageData = new FormData();
            imageData.append('controller', "image");
            imageData.append('action', "upload");
            imageData.append('productId', currentProduct.productId);
            imageData.append('fileUpload', image);
            imageData.append('apiToken', accountData.apiToken);
            imageData.append('accountType', accountData.accountType);
        })
    }

    return (
        <main>
            <div className="image__container">
                <div className="image__dragArea" onDragEnter={dragEnter} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                    <form action="">
                        <input type="file" multiple accept="image/*" onChange={e => handleFiles(e.target.files)} />
                        <label htmlFor="">Select Images</label>
                    </form>
                    {console.log(images)}
                    <div className="imageOutput">{previewImages.map((img, i) => {
                        return <img className="image--sml" src={img} key={i} />;
                    })}</div>
                </div>
                <button onClick={uploadImages}>Upload</button>
                <Link to="/Add-Colors">Next</Link>
            </div>
        </main>
    )
}

export default ProductImage;