import { ButtonStyled } from './Button/Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load More
    </ButtonStyled>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
