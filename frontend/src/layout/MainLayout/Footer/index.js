import React from 'react';

// ==============================|| Footer Style||============================== //
const footerStyles = {
    borderTop: '1px solid #ddd',
    textAlign: 'center',
    padding: '5px 0',
    backgroundColor: '',
    minHeight: 'auto',
  };

  const copyrightStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  };

// ==============================|| Footer ||============================== //

const Footer = () => {

  const footerCopyright = () =>{
    const currentYear = new Date().getFullYear()
    return (
        <p style={copyrightStyles}>
        <img src= '/logoVerde.png' width="30" height="24" style={{ marginRight: '10px' }}/>  ©{currentYear} Owizer. All rights reserved</p>
    )
  }


  return (
    <footer style={footerStyles}>
        <div >{footerCopyright()}</div>
    </footer>
  )
};



export default Footer;