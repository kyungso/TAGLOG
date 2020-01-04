import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    margin-left: auto;
    align-items: center;
  }
`;

const categories = [
  {
    name: 'home',
    text: '홈'
  },
  {
    name: 'posts',
    text: '전체글'
  },
  {
    name: 'album',
    text: '사진첩'
  },
  {
    name: 'schedule',
    text: '일정'
  },
  {
    name: 'member',
    text: '멤버'
  },
];
 
const CategoriesBlock = styled.div`
    display: flex;
    flex: none;
    padding-top: 0.5rem;
    width: 100px;
    margin-left: 30px;
`;

const Category = styled(NavLink)`
    font-size: 1rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
        color: #495057;
    }

    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }

    & + & {
        margin-left: 1rem;
    }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
     <HeaderBlock>
       <Wrapper>
         <Link to="/" className="logo">FAMLOG</Link>
         <CategoriesBlock>
          {categories.map(c => (
            <Category 
              key={c.name}
              activeClassName="active"
              exact={c.name === 'home'}
              to={c.name === 'home' ? '/' : `/${c.name}`}
            >
            {c.text}
            </Category>
          ))}
         </CategoriesBlock>
         {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
         ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
         )}
       </Wrapper>
     </HeaderBlock>
     <Spacer />
    </>
  );
};

export default Header;