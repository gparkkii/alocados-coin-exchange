import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Exchanger from './components/Exchanger';
import Wallet from './components/Wallet';
import ToastMessage from 'components/ToastMessage';
import { RootState } from 'redux/store';
import { updateTransaction } from 'redux/walletSlice';
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
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 18px;
`;

const ExchangePage = () => {
  const dispatch = useDispatch();
  const transactionUpdated = useSelector(
    (state: RootState) => state.wallet.transactionUpdated,
  );
  const closeToast = () => dispatch(updateTransaction(false));

  return (
    <Wrapper>
      <Title1>환전하기</Title1>
      <ToastMessage
        isOpen={transactionUpdated}
        message="최근 거래 후 갱신되었습니다."
        onClose={closeToast}
      />
      <HStack>
        <Wallet />
        <Exchanger />
      </HStack>
    </Wrapper>
  );
};

export default ExchangePage;
