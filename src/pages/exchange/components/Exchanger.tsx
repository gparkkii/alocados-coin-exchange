import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import CoinSelector from './CoinSelector';
import ExchangerInput from './ExchangerInput';
import { CoinType } from '@types';
import Icon from 'components/Icon';
import { COIN } from 'constants/Coin';
import { RootState } from 'redux/store';
import { exchangeCoin } from 'redux/walletSlice';

const ExchangerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

const HStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const Exchanger = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);

  const [fromCoin, setFromCoin] = useState<CoinType>('ethereum');
  const [toCoin, setToCoin] = useState<CoinType>('solana');
  const [fromAmount, setFromAmount] = useState<number>(wallet[fromCoin]);
  const [toAmount, setToAmount] = useState<number>(wallet[toCoin]);

  const handleCoinSelector = (type: 'to' | 'from', coin: CoinType) => {
    if (type === 'to') {
      setToCoin(coin);
    } else {
      setFromCoin(coin);
    }
  };

  const handleAmountChange = (
    type: 'to' | 'from',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length > 10) {
      return;
    }
    const parsedValue = parseFloat(inputValue.replace(/[^0-9.]/g, ''));

    if (type === 'to') {
      setToAmount(parsedValue);
    } else {
      setFromAmount(parsedValue);
    }
  };

  const handleExchange = () => {
    if (fromCoin && toCoin && fromAmount > 0) {
      dispatch(exchangeCoin({ fromCoin, toCoin, amount: fromAmount }));
    }
  };

  return (
    <ExchangerBox>
      <HStack>
        <ExchangerInput
          label="전환수량 (from)"
          value={fromAmount}
          onChange={e => handleAmountChange('from', e)}
        />
        <CoinSelector
          selectedCoin={COIN[fromCoin]}
          onSelect={coin => handleCoinSelector('from', coin)}
        />
      </HStack>
      <Icon name="swap" width={40} height={40} />
      <HStack>
        <ExchangerInput
          disabled
          label="전환수량 (to)"
          value={toAmount}
          onChange={e => handleAmountChange('to', e)}
        />
        <CoinSelector
          selectedCoin={COIN[toCoin]}
          onSelect={coin => handleCoinSelector('to', coin)}
        />
      </HStack>
    </ExchangerBox>
  );
};

export default Exchanger;
