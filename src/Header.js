import React, { useEffect } from 'react';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import { useDataLayerValue } from './DataLayer';


function Header() {
  const [{ user }] = useDataLayerValue();

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      const gap = 50;
      if (window.scrollY >= gap) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
  
    <div className='header'>
      <div className='header-container'>
        <div className='header__left'></div>
        <div className='header__right'>
          <Avatar src={user?.images[0]?.url} alt = 'Avatar' className='avatar' />
        </div>
      </div>
    </div>
  );
}

export default Header;
