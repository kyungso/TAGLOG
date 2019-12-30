import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
  height: calc(100vh - 64px);
  background: ${palette.gray[1]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .logo-area {
      display: block;
      padding-bottom: 2rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
          <WhiteBox>
            <div className="logo-area">
              <Link to="/">FAMLOG</Link>
            </div>
            {children}
          </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;