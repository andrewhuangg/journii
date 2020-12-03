import React from 'react';
import { Link } from 'react-router-dom';

const SliderDropDownMenu = ({ link }) => {
  return (
    <>
      <Link to={`${link.path}`} className='dd-menu flex flex-jc-sb flex-ai-c'>
        <div className='dd-menu__container flex flex-jc-fs flex-ai-c'>
          <p className='dd-menu__label'>{link.title}</p>
        </div>
      </Link>
    </>
  );
};

export default SliderDropDownMenu;
