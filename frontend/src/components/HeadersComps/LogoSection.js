import { useNavigate } from 'react-router-dom';

const LogoSection = () => {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate('/')
  }

  return (
    <img 
    src='/OwizerLogoLight.png' 
    alt="Owizer logo" 
    width={130} 
    onClick={handleClick}
    style={{ cursor: 'pointer' }}  
    />
  );
};

export default LogoSection;