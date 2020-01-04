import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  z-index: 100;
`;

const LogoWrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
`;

const Logo = () => {
  return (
    <>
     <LogoBlock>
       <LogoWrapper>
         <Link to="/" className="logo">FAMLOG</Link>
       </LogoWrapper>
     </LogoBlock>
    </>
  );
};

export default Logo;