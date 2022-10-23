import React, { useState } from "react";
import Lightbox from "./components/CoolLightbox";
import ImageMosaic from "./components/ImageMosaic";
import images from "./images";

const ImageGallery = () => {
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState();

  return (
    <>
      {/* react-photo-gallery */}
      <ImageMosaic
        images={images}
        handleClick={(e, { index }) => {
          setCurrentIndex(index);
          setOpen(true);
        }}
      />
      {/* react-spring-lightbox */}
      <Lightbox
        currentImageIndex={currentImageIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        images={images}
      />
    </>
  );
};

export default ImageGallery;
