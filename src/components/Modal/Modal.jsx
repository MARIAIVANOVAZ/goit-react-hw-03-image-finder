import s from './Modal.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    console.log('modal component did mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
    console.log(e.code);
  };
  handleBackdrope = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={s.Overlay} onClick={this.handleBackdrope}>
        <div className={s.Modal}>
          {this.props.children}
          {/* <img src={modalImage} alt={modalImage} /> */}
        </div>
      </div>
    );
  }
}
// const Modal = ({ modalImage, onClose }) => (
//   <div className={s.Overlay}>
//     <div className={s.Modal}>
//       <img src={modalImage} alt={modalImage} />
//     </div>
//   </div>
// );
Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
export default Modal;
