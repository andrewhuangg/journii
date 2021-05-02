import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AlertMessage = () => {
  const alert = useSelector((state) => state.common.alerts);
  const { alerts } = alert;

  const messages = ['alert 1', 'alert 2', 'alert 3', 'alert 4', 'dshflakjshgfa;lskhgasljhg;lsdhg'];

  const createNotification = (message = null, type = null) => {
    const notif = document.createElement('div');
    const alertMessage = document.querySelector('.alertmessage');
    notif.classList.add('alertmessage__alert');
    notif.classList.add(type ? type : 'success');

    notif.innerText = message ? message : getRandomMessage();
    alertMessage.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 3000);
  };

  const getRandomMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <>
      <div className='alertmessage'></div>
      <button onClick={() => createNotification('This is invalid data')}>button</button>
    </>
  );
};

export default AlertMessage;
