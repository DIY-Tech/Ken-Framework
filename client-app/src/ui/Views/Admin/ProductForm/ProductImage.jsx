import React, { useState } from 'react';

function ProductImage() {

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] =useState([]);

    function dragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function dragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function dragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function drop(e) {
        e.preventDefault();
        e.stopPropagation();
        let data = e.dataTransfer;
        let files = data.files;
        HandleFiles(files);
    }

    function HandleFiles(files) {
        files = [...files];
        setImages(files);
        images.ForEach(previewFile);
    }

    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setPreviewImages([...previewImages, reader.result]);
        }
    }

    return (
        <div className="image__dragArea"dragEnter={dragEnter} dragOver={dragOver} dragLeave={dragLeave} drop={drop}>
            <form action="">
                <p></p>
                <input type="file" multiple accept="image/*" />
                <label htmlFor="">Select Images</label>
            </form>
            <div className="imageOutput">{previewImages.map((img, i) => (<img src={img} key={i} />))}</div>
        </div>
    )
}

export default ProductImage;