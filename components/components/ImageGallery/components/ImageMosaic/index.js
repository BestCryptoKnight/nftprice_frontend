import React from "react";
import PropTypes from "prop-types";
import Gallery from "react-photo-gallery";
import GridImage from "./components/GridImage";

const ImageMosaic = ({ images, handleClick }) => (
  <div className='gallery-container'>
    <Gallery
      columns={containerWidth => {
        let columns = 1;
        if (containerWidth >= 420) columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;

        return columns;
      }}
      onClick={handleClick}
      photos={images}
      margin={10}
      padding={0}
      direction="column"
      renderImage={GridImage}
    />
  </div>
);

ImageMosaic.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired
    })
  ),
  handleClick: PropTypes.func.isRequired
};

export default ImageMosaic;


