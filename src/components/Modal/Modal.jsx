import s from './Modal.module.css';
import PropTypes from 'prop-types';
const Modal = ({ modalImage, onClose }) => (
  <div className={s.Overlay}>
    <div className={s.Modal}>
      <img src={modalImage} alt={modalImage} />
    </div>
  </div>
);
Modal.propTypes = {
  modalImage: PropTypes.string,
  onClose: PropTypes.func,
};
export default Modal;
