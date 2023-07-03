import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { CoinInfoType } from '@types';
import Icon from 'components/Icon';
import { COIN } from 'constants/Coin';
import { RootState } from 'redux/store';
import { Body2, Body2Bold, Strong } from 'styles/typography';

const WalletBox = styled.div`
  ${({ theme }) => theme.backgroundStyle.shade000};
  min-width: 308px;
  padding: 24px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.shade300};
  margin: 16px 0px;
`;

const CoinStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CoinIcon = styled.div`
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.shadeOpacity5};
`;

const CoinBadge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

interface BalanceProps {
  coin: CoinInfoType;
  balance: number;
}
const Balance = ({ coin, balance }: BalanceProps) => {
  const numberWithCommas = balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div>
      <CoinBadge>
        <CoinIcon>
          <Icon name={coin.icon} width={20} height={20} />
        </CoinIcon>
        <Body2> {coin.name}</Body2>
      </CoinBadge>
      <Body2Bold>
        {numberWithCommas} {coin.unit}
      </Body2Bold>
    </div>
  );
};

const Wallet = () => {
  const wallet = useSelector((state: RootState) => state.wallet);
  return (
    <WalletBox>
      <Strong>지갑</Strong>
      <Divider />
      <CoinStack>
        <Balance coin={COIN.solana} balance={wallet.solana} />
        <Balance coin={COIN.ethereum} balance={wallet.ethereum} />
        <Balance coin={COIN.bnb} balance={wallet.bnb} />
      </CoinStack>
    </WalletBox>
  );
};

export default Wallet;
