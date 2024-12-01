import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import lightbox styles
import { URL_IMAGE } from "../../utils/constant";

const ImageGallery = ({ images, close }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    if (!images || images.length === 0) {
        return <p>No images available</p>;
    }

    // useEffect(() => {
    //     if (!images || images.length === 0) {
    //         setIsOpen(false);
    //     }else{
    //         setIsOpen(true);
    //     }
    // }, [images]);

    return (
        <div>
            {/* Button to open the gallery */}
            {/* <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => setIsOpen(true)}
            >
                View Images
            </button> */}

            {/* Lightbox for the gallery */}
            <Lightbox
                mainSrc={URL_IMAGE + images[photoIndex]?.image}
                nextSrc={
                    URL_IMAGE + images[(photoIndex + 1) % images.length]?.image
                }
                prevSrc={
                    URL_IMAGE +
                    images[(photoIndex + images.length - 1) % images.length]
                        ?.image
                }
                onCloseRequest={() => close()}
                onMovePrevRequest={() =>
                    setPhotoIndex(
                        (photoIndex + images.length - 1) % images.length
                    )
                }
                onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                }
            />
        </div>
    );
};

export default ImageGallery;
