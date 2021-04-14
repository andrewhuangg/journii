import React from 'react';
import UserItemList from '../posts/UserItemList';

const Modal = ({ modalState, userInfo, type }) => {
  return (
    <>
      <div className={`modal modalshowing-${modalState}`}>
        <div className='modal__container'>
          <UserItemList userInfo={userInfo} type={type} />
        </div>
      </div>
    </>
  );
};

export default Modal;
