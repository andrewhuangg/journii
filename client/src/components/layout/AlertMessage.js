import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AlertMessage = () => {
  const alert = useSelector((state) => state.common.alerts);
  const { alerts } = alert;

  const createNotification = () => {
    const notif = document.createElement('div');
    const alertMessage = document.querySelector('.alertmessage');
    notif.classList.add('alertmessage__alert');

    if (alerts.length > 0) {
      for (let i = 0; i < alerts.length; i++) {
        const text = alerts[i].alert;
        const alertType = alerts[i].type;
        notif.classList.add(alertType ? alertType : 'success');
        notif.innerText = text;
      }
    }

    alertMessage.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 5000);
  };

  useEffect(() => {
    if (alerts.length > 0) {
      createNotification();
    }
  }, [alerts.length]);

  return (
    <>
      <div className='alertmessage'></div>
    </>
  );
};

export default AlertMessage;
