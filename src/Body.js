import React from 'react'
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import { useEffect, useState, useRef } from 'react';


function Body() {
  const [{ user, playlists }, dispatch] = useDataLayerValue();
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('rgb(137, 194, 151)'); // Default color

  const [sliceRange, setSliceRange] = useState([0, playlists?.items?.length]); // Set initial slice range
  const contentWrapperRef = useRef(null);


  useEffect(() => {

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

      if (avgG > avgR && avgG > avgB) {
        prominentColor = 'G';
      } else if (avgB > avgR && avgB > avgG) {
        prominentColor = 'B';
      }

      if (prominentColor === 'R') {
        avgR *= scalingFactor;
      } else if (prominentColor === 'G') {
        avgG *= scalingFactor;
      } else if (prominentColor === 'B') {
        avgB *= scalingFactor;
      }

      setHeaderBackgroundColor(`rgb(${avgR}, ${avgG}, ${avgB})`);
    };
    const handleResize = () => {
      const windowLimit = 850;
      const items = document.querySelectorAll('.public-playlists .content-wrapper .item');
      const playlistWrapper = document.querySelector('.public-playlists .content-wrapper');
      let adjustedMaxItems = 6; // Default value
  
      if(window.innerWidth > windowLimit){
        items.forEach((item) => {
          item.classList.add('item-large');
          item.classList.remove('item-small');
        });
        playlistWrapper.classList.add('wrapper-large');
        playlistWrapper.classList.remove('wrapper-small');
      if (contentWrapperRef.current) {
        const contentWrapperWidth = contentWrapperRef.current.offsetWidth;
        const itemWidth = 200;
  
        // Calculate the max number of items that can fit in the wrapper
        const maxItems = Math.floor(contentWrapperWidth / itemWidth);
  
        adjustedMaxItems = maxItems;
  
        // Check if any playlist item is wider than the wrapper and adjust the slice range
        playlists?.items?.forEach((playlist) => {
          if (playlist.images[0].width > contentWrapperWidth) {
            adjustedMaxItems--;
          }
        });
  
        setSliceRange([0, adjustedMaxItems]);
  
        if (adjustedMaxItems < 4){
          // Change the size of items to fit more in the wrapper
        }
      }
    } else {
      items.forEach((item) => {
        item.classList.add('item-small');
        item.classList.remove('item-large');
      });
      playlistWrapper.classList.add('wrapper-small');
      playlistWrapper.classList.remove('wrapper-large');
      setSliceRange([0, 5]);
    }
    
    };

    const observer = new MutationObserver(() => {
      handleResize();
    });

    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };


}, []);

  return (
    <>
    <div className='body'>
      

      <div className='body__header'>
      <div className="body__header-container" style={{ backgroundColor: headerBackgroundColor }}>
          <div className='body__header-left'>
            <img src={user?.images[1]?.url} alt="Profile" />
          </div>
          <div className='body__header-right'>
            <p>Profileify</p>
            <h4>{user?.display_name}</h4>
            <p>{user?.followers?.total} Spotify Followers • {playlists.total} Public Playlists</p>
          </div>
        </div>
      </div>

      <div className='main-body'>

      <div className= 'public-playlists'>
        <div className = 'content-wrapper' ref={contentWrapperRef}>
          {playlists?.items?.slice(...sliceRange).map(playlist =>
          <div className = 'item'>
            <div className = 'img-wrapper'>
          <img src={playlist?.images[0]?.url} alt="Playlist" />
            </div>
            <p>{playlist?.name}</p>
          </div>
          )}
          </div>
      </div>

      </div>

    </div>

    </>
  )
}

export default Body