import React from 'react';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import { useDataLayerValue } from './DataLayer';
import { useEffect, useState } from 'react';


function Header() {
  const [{ user }] = useDataLayerValue();
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('rgb(137, 194, 151)'); // Default color

  useEffect(() => {
    const header = document.querySelector('.header');
    const headerImage = new Image();
    
    headerImage.src = user?.images[1]?.url;
    headerImage.crossOrigin = 'Anonymous';

    headerImage.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = headerImage.width;
      canvas.height = headerImage.height;
      context.drawImage(headerImage, 0, 0, headerImage.width, headerImage.height);

      const imageData = context.getImageData(0, 0, headerImage.width, headerImage.height).data;
      let totalR = 0, totalG = 0, totalB = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        totalR += imageData[i];
        totalG += imageData[i + 1];
        totalB += imageData[i + 2];
      }

      let avgR = Math.round(totalR / (imageData.length / 4));
      let avgG = Math.round(totalG / (imageData.length / 4));
      let avgB = Math.round(totalB / (imageData.length / 4));

      let prominentColor = 'R';
      let scalingFactor = 5;

      if (avgG > avgR && avgG > avgB){
        prominentColor = 'G';
      } else if (avgB > avgR && avgB > avgG){
        prominentColor = 'B';
      }

      if (prominentColor === 'R'){
        avgR *= scalingFactor ;
      } else if (prominentColor === 'G'){
        avgG *= scalingFactor ;
      } else if (prominentColor === 'B'){
        avgB *= scalingFactor;
      }

      setHeaderBackgroundColor(`rgb(${avgR}, ${avgG}, ${avgB})`);
    };


    const handleScroll = () => {
      const gap = 50;
      if (window.scrollY >= gap) {
        header.classList.add('active');
        header.style.backgroundColor = headerBackgroundColor;
      } else {
        header.classList.remove('active');
        header.style.backgroundColor = '';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, headerBackgroundColor]);

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
