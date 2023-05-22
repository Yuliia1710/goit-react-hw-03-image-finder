import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, showModal, setCurrentImg }) => {
  return (
    <Gallery className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          showModal={showModal}
          setCurrentImg={setCurrentImg}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
};
