import React, { Fragment } from 'react';

const Header = ({connectWallet, address}) => {
   return (
    <Fragment>  
      <div className='header n-container'>
        <img src='/img/logo.png' alt="" className='logo' />
        {
          address ? (
            <>
              <button className='connect_wallet'>{address.slice(0, 10) + "..." + address.slice(address.length - 10, address.length)}</button>
            </>
          ) : (
            <>
              <button className='connect_wallet' onClick={connectWallet}>Connect Wallet</button>
            </>
          )
        }
      </div>
     </Fragment>
  );
};

export default Header;
