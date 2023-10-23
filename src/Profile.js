import React from 'react'
import './Profile.css';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

function Profile( {spotify} ) {
    return (
        <div className="profile">
                <div className="profile__body">
                        <Header />
                        <Body />
                        <Footer />
                </div>
        </div>
    );
}

export default Profile;
