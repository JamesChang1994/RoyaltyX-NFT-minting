import React from 'react';
import { connect } from 'react-redux';


const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <img src='/img/logo.png' alt="" className='logo' />
      </div>
    </footer>
  );
};

export default connect()(Footer);
