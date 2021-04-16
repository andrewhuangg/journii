import React from 'react';

const MobileMenu = ({ mobileRef, mobileOpen, userInfo, currentUser, setMobileOpen }) => {
  return (
    <>
      <div className={`mobile-menu open-${mobileOpen} hide-for-desktop`}>
        <div className='mobile-menu__container hide-for-desktop' ref={mobileRef}>
          gfasgksdfjgksfadsfgkdasflgsdfklgfdsk'gds;'fg
          {/* <div onClick={() => setMobileOpen(!mobileOpen)}>X</div> */}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
