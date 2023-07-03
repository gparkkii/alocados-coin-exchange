import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import HistoryBar from './components/HistoryBar';
import { RootState } from 'redux/store';

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  width: 100%;
  gap: 8px;
`;

const HistoryPage = () => {
  const { exchangeHistory } = useSelector((state: RootState) => state.wallet);

  return (
    <VStack>
      {exchangeHistory.map((history, index) => (
        <HistoryBar key={`${history.timestamp}_${index}`} history={history} />
      ))}
    </VStack>
  );
};

export default HistoryPage;
