import React from 'react';

// ==============================|| Footer Style||============================== //
const footerStyles = {
    borderTop: '1px solid #ddd',
    textAlign: 'center',
    padding: '20px 0',
    margin: '20px'
  };

// ==============================|| Footer ||============================== //

const Footer = () => {


  const footerCopyright = () =>{
    const currentYear = new Date().getFullYear()
    return (
        <p><img src= '/logoVerde.png' width="30" height="24" style={{inlineMargin : "5px auto "}}/> ©{currentYear} Owizer. All rights reserved</p>
    )
  }


  return (
    <footer style={footerStyles}>
        <div >{footerCopyright()}</div>
    </footer>
  )
};



export default Footer;