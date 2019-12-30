import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import MainImage from '../../lib/images/MainImage.png';

const HomeBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const HomeImageBlock = styled.div`
  height: 400px;
`;

const HomeImage = styled.div`
  background-image: url(${MainImage});
  background-size: cover;
  background-position: center center;
  height: 100%;
`;

const Home = () => {
  return (
    <HomeBlock>
      <HomeImageBlock>
        <HomeImage />
      </HomeImageBlock>
    </HomeBlock>
  );
};

export default Home;
