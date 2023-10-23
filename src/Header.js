import React from 'react'
import './Header.css'
import Avatar from '@mui/material/Avatar';
import { useDataLayerValue } from './DataLayer';

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <div className='header'>
      <div className='header__left'>
            <Avatar src={user?.images[0]?.url} alt = "Avatar"/>
        </div>
      <div className='header__right'>
        <h4 className = 'username'>{user?.display_name}</h4>
        </div>
    </div>
  )
}

export default Header