import React from 'react';

// ==============================|| Footer Style||============================== //
const footerStyles = {
    borderTop: '1px solid #ddd',
    textAlign: 'center',
    padding: '10px 0',
    margin: '10px',
    backgroundColor: ''
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