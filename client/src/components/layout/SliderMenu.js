import React from 'react';
import SliderDropDownMenu from './SliderDropDownMenu';
import { Link } from 'react-router-dom';

const SliderMenu = ({ menuLinks, logoutHandler, userInfo }) => {
  return (
    <div className='slider hide-for-mobile has-slide'>
      <div className='slider__wrap'>
        {menuLinks.map((link, i) => (
          <SliderDropDownMenu link={link} key={i} logoutHandler={logoutHandler} />
        ))}
        {userInfo && (
          <Link to='#' onClick={logoutHandler} className='flex flex-jc-fs flex-ai-c'>
            Log out
          </Link>
        )}
      </div>
    </div>
  );
};

export default SliderMenu;
