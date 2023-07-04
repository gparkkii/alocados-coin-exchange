import React from 'react';
import { styled } from 'styled-components';
import { mediaQuery } from '../theme/breakpoints';
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

  ${mediaQuery.sm} {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const HistoryStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width: 70%;
  min-width: 380px;
  width: 100%;
  gap: 32px;
  ${mediaQuery.sm} {
    max-width: 100%;
  }
`;

const TimestampLabel = styled.div`
  width: 100%;
`;

const CoinLabel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
          <Icon name={COIN[from.type].type} width={24} height={24} />
          <Body2Bold>
            {formatHistoryAsset(from.amount)} {COIN[from.type].unit}
          </Body2Bold>
        </CoinLabel>
        <Icon name="chevronRight" width={16} height={16} />
        <CoinLabel>
          <Icon name={COIN[to.type].type} width={24} height={24} />
          <Body2Bold>
            {formatHistoryAsset(to.amount)} {COIN[to.type].unit}
          </Body2Bold>
        </CoinLabel>
      </HistoryStack>
    </BarWrapper>
  );
};

export default HistoryBar;
