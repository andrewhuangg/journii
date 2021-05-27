import React from 'react';
import UserItemList from '../posts/UserItemList';

const Modal = ({ modalState, userId, type, modalRef, setModalState, profile }) => {
  return (
    <>
      <div className={`modal modalshowing-${modalState} modaldashboard`}>
        <div className={`modal__container modaldashboard__container`} ref={modalRef}>
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
