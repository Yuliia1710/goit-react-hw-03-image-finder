import { Img, Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ image, showModal, setCurrentImg }) => {
  // console.log('image', image);

  const onPictureClick = () => {
    setCurrentImg(image.largeImageURL);
    showModal();
  };

  return (
    <Item>
      <Img src={image.webformatURL} alt={image.tags} onClick={onPictureClick} />
    </Item>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};
