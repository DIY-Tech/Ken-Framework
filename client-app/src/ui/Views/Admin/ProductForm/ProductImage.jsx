import React, { useState, useEffect, useReducer, useContext } from 'react';
import {AppContext} from '../../../../App';
import { Link, Redirect } from 'react-router-dom';
import Service from '../../../../services/service';

function imageReducer(state, action) {
    switch (action.type) {
        case 'addImage':
            return [...state, action.data];
        default:
            throw new Error();
    }
}

function ProductImage() {

    const [previewImages, imgDispatch] = useReducer(imageReducer, []);
    const [images, setImages] = useState([]);
    const {accountData, currentProduct, dispatch} = useContext(AppContext);

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
        imgDispatch({ type: 'addImage', data: img });
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
            fetch(Service.domain, {method: 'POST', body: imageData,})
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    dispatch({
                        type: "updateNotification",
                        data: {
                            open: true,
                            status: res.status,
                            message: res.message
                        }
                    })
                }
            })
        })
    }

    if(currentProduct.productId === "" || currentProduct.productId === undefined) {
        return <Redirect to="/Product-Form" />;
    }

    return (
        <main>
            <div className="image__container">
                <div className="image__dragArea" onDragEnter={dragEnter} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                    <form className="image__form" action="">
                        <input type="file" multiple accept="image/*" id="fileUpload" onChange={e => handleFiles(e.target.files)} />
                        <label htmlFor="fileUpload">Select or Drag Images</label>
                    </form>
                    <div className="imageOutput">{previewImages.map((img, i) => {
                        return <img className="image--sml" src={img} key={i} />;
                    })}</div>
                </div>
                <div className="image__button-container">
                    <button className="image__button-upload"  onClick={uploadImages}>Upload</button>
                    <Link className="image__button-next" to="/Add-Colors">Next</Link>
                </div>
            </div>
        </main>
    )
}

export default ProductImage;