import React from 'react'
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import { useEffect, useState } from 'react';


function Body() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('rgb(137, 194, 151)'); // Default color
  
  useEffect(() => {
    const headerImage = new Image();
    headerImage.src = user?.images[1]?.url;

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

      const avgR = Math.round(totalR / (imageData.length / 4));
      const avgG = Math.round(totalG / (imageData.length / 4));
      const avgB = Math.round(totalB / (imageData.length / 4));

      setHeaderBackgroundColor(`rgb(${avgR}, ${avgG}, ${avgB})`);
    };
  }, [user]);



  return (
    <div className='body'>

      <div className='body__header'>
      <div className="body__header-container" style={{ backgroundColor: headerBackgroundColor }}>
          <div className='body__header-left'>
            <img src={user?.images[1]?.url} alt="Profile" />
          </div>
          <div className='body__header-right'>
            <h4>{user?.display_name}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body