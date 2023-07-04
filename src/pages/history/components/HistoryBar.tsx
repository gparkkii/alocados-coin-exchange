import React from 'react';
import { styled } from 'styled-components';
import { ExchangeHistoryType } from '@types';
import Icon from 'components/Icon';
import { COIN } from 'constants/Coin';
import { Body2Bold, Caption1 } from 'styles/typography';
import { formatHistoryAsset, formatDate } from 'utils/stringParser';

export const BarWrapper = styled.div`
  ${({ theme }) => theme.backgroundStyle.shade100};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  gap: 32px;
`;

const HistoryStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 32px;
`;

const TimestampLabel = styled.div`
  min-width: 206px;
`;

const CoinLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  gap: 8px;
`;

interface HistoryBarProps {
  history: ExchangeHistoryType;
}

const HistoryBar = ({ history }: HistoryBarProps) => {
  const { from, to, timestamp } = history;
  return (
    <BarWrapper>
      <TimestampLabel>
        <Caption1>{formatDate(timestamp)}</Caption1>
      </TimestampLabel>
      <HistoryStack>
        <CoinLabel>
          <Icon name={COIN[from.type].icon} width={24} height={24} />
          <Body2Bold>
            {formatHistoryAsset(from.amount)} {COIN[from.type].unit}
          </Body2Bold>
        </CoinLabel>
        <Icon name="chevronRight" width={16} height={16} />
        <CoinLabel>
          <Icon name={COIN[to.type].icon} width={24} height={24} />
          <Body2Bold>
            {formatHistoryAsset(to.amount)} {COIN[to.type].unit}
          </Body2Bold>
        </CoinLabel>
      </HistoryStack>
    </BarWrapper>
  );
};

export default HistoryBar;
