import s from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button type="button" className={s.Button} onClick={onClick}>
    Load more
  </button>
);
Button.propTpes = {
  onClick: PropTypes.func,
};

export default Button;
