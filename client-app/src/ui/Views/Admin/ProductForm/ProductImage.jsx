import React, { useState, useEffect, useReducer } from 'react';

function imageReducer(state, action) {
    switch(action.type) {
        case 'addImage':
            return [...state, action.data];
        default:
            throw new Error();
    }
}

function ProductImage() {
    
    const [previewImages, dispatch] = useReducer(imageReducer, []);
    const [images, setImages] = useState([]);
    
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
        dispatch({type: 'addImage', data: img});
    }

    function handleFiles(files) {
        setImages([...images, ...files]);
        [...images, ...files].forEach(file => {
            previewFile(file);
        })
    }

    return (
        <div className="image__dragArea" onDragEnter={dragEnter} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
         {/* <div className="image__dragArea"> */}
            <form action="">
                <p></p>
                <input type="file" multiple accept="image/*" onChange={e => handleFiles(e.target.files)} />
                <label htmlFor="">Select Images</label>
            </form>
            {console.log(images)}
            <div className="imageOutput">{previewImages.map((img, i) => {
               return <img className="image--sml" src={img} key={i} />;
            })}</div>
        </div>
    )
}

export default ProductImage;