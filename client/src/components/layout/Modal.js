import React from 'react';
import UserItemList from '../posts/UserItemList';

const Modal = ({ modalState, userInfo, type, modalRef, setModalState, location }) => {
  return (
    <>
      <div className={`modal modalshowing-${modalState} modal${location}`}>
        <div className={`modal__container modal${location}__container`} ref={modalRef}>
          <UserItemList
            userInfo={userInfo}
            type={type}
            setModalState={setModalState}
            modalState={modalState}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
