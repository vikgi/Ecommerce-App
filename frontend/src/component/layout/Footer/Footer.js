import React from 'react'
import playStore from "./google-play-badge.png";
import AppStore from './Download_on_the_App_Store_Badge.svg.png'
import "./Footer.css"

export default function Footer() {
  return (
    <footer id="footer">
    <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={AppStore} alt="Appstore" />
    </div>

    <div className='midFooter'>
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; emc</p>
    </div>

    <div className='rightFooter'>
        <h4>Follow us</h4>
        <a href="https://chat.openai.com/c/967cd6fb-9725-4e4f-9a7f-62b38c808cdb">Instagram</a>
        <a href="https://chat.openai.com/c/967cd6fb-9725-4e4f-9a7f-62b38c808cdbhttps://chat.openai.com/c/967cd6fb-9725-4e4f-9a7f-62b38c808cdb">Youtube</a>
        <a href="https://chat.openai.com/c/967cd6fb-9725-4e4f-9a7f-62b38c808cdb">Facebook</a>
    </div>

    </footer>
  );
};
