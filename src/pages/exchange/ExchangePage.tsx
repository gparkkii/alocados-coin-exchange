import React from 'react';
import { styled } from 'styled-components';
import Wallet from './components/Wallet';
import { Title1 } from 'styles/typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 960px;
  width: 100%;
  gap: 24px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

const ExchangePage = () => {
  return (
    <Wrapper>
      <Title1>환전하기</Title1>
      <HStack>
        <Wallet />
      </HStack>
    </Wrapper>
  );
};

export default ExchangePage;
