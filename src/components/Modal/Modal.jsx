import { Overlay, ModalWraper, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydownCheck);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownCheck);
  }

  keydownCheck = e => {
    if (e.code === 'Escape') {
      this.props.hideModal();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.hideModal();
    }
  };

  render() {
    return createPortal(
      <Overlay className="overlay" onClick={this.onBackdropClick}>
        <ModalWraper className="modal">
          <ModalImg src={this.props.currentImg} alt="preview" />
        </ModalWraper>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  currentImg: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
