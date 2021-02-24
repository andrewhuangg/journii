import React, { useState } from 'react';

const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button className='Button CenterAlign' onClick={() => setModalIsOpen(!modalIsOpen)}>
        Settings
      </button>
      <div className={`Modal ${modalIsOpen ? 'Show' : ''}`}>
        <button className='Close' onClick={() => setModalIsOpen(!modalIsOpen)}>
          X
        </button>
      </div>
      <div
        className={`Overlay ${modalIsOpen ? 'Show' : ''}`}
        onClick={() => setModalIsOpen(!modalIsOpen)}
      />
    </>
  );
};

export default Modal;
