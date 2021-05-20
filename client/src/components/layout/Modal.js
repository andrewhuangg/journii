import React from 'react';
import UserItemList from '../posts/UserItemList';

const Modal = ({ modalState, userId, type, modalRef, setModalState, location, profile }) => {
  return (
    <>
      <div className={`modal modalshowing-${modalState} modal${location}`}>
        <div className={`modal__container modal${location}__container`} ref={modalRef}>
          <UserItemList
            userId={userId}
            type={type}
            setModalState={setModalState}
            modalState={modalState}
            profile={profile}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
