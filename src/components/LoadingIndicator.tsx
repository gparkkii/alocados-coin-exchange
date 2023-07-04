import React from 'react';
import Lottie from 'react-lottie';
import { styled } from 'styled-components';
import loadingIndicator from 'assets/lottie/loading-indicator.json';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LoadingIndicator = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingIndicator,
  };

  return (
    <Wrapper>
      <Lottie options={defaultOptions} width={148} height={148} />
      <h3>loading...</h3>
    </Wrapper>
  );
};

export default LoadingIndicator;
