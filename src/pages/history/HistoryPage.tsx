import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import HistoryBar, { BarWrapper } from './components/HistoryBar';
import Icon from 'components/Icon';
import { RootState } from 'redux/store';
import { Caption1, Filter } from 'styles/typography';

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  width: 100%;
  gap: 8px;
`;

const FilterStack = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Arrow = styled.div<{ $isDescending?: boolean }>`
  display: flex;
  align-items: center;
  transform: ${({ $isDescending }) =>
    $isDescending ? 'none' : 'rotate(-180deg)'};
`;

const HistoryPage = () => {
  const { exchangeHistory } = useSelector((state: RootState) => state.wallet);
  const [isDescending, setIsDescending] = useState(true);

  const handleSortClick = () => {
    setIsDescending(prevState => !prevState);
  };

  const sortedHistory = exchangeHistory.slice().sort((a, b) => {
    if (isDescending) {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });

  return (
    <VStack>
      <BarWrapper>
        <FilterStack onClick={handleSortClick}>
          <Filter>환전 시간</Filter>
          <Arrow $isDescending={isDescending}>
            <Icon name="arrowDown" width={16} height={16} />
          </Arrow>
        </FilterStack>
        <Caption1>환전 금액</Caption1>
      </BarWrapper>
      {sortedHistory.map((history, index) => (
        <HistoryBar key={`${history.timestamp}_${index}`} history={history} />
      ))}
    </VStack>
  );
};

export default HistoryPage;
