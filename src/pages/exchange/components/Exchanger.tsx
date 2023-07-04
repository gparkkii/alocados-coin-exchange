import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import CoinSelector from './CoinSelector';
import ExchangerInput from './ExchangerInput';
import { CoinType } from '@types';
import Button from 'components/Button';
import HistoryBar from 'components/HistoryBar';
import Icon from 'components/Icon';
import { COIN } from 'constants/Coin';
import { RootState } from 'redux/store';
import { exchangeCoin } from 'redux/walletSlice';
import { calculateCoinExchange } from 'utils/exchangeRate';

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

interface exchangeDataType {
  fromCoin: CoinType;
  toCoin: CoinType;
  fromAmount: string;
  toAmount: string;
}

const INITIAL_AMOUNT = 1;
const INITIAL_EXCHANGE_DATA: exchangeDataType = {
  fromCoin: 'ethereum',
  toCoin: 'solana',
  fromAmount: INITIAL_AMOUNT.toString(),
  toAmount: calculateCoinExchange({
    fromCoin: 'ethereum',
    toCoin: 'solana',
    amount: INITIAL_AMOUNT,
  }),
};

const Exchanger = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);
  const recentHistory =
    wallet.exchangeHistory[wallet.exchangeHistory.length - 1];

  const [exchangeData, setExchangeData] = useState(INITIAL_EXCHANGE_DATA);
  const { fromCoin, toCoin, fromAmount, toAmount } = exchangeData;

  const handleCoinSwap = useCallback(() => {
    setExchangeData(prev => ({
      fromCoin: prev.toCoin,
      toCoin: prev.fromCoin,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }));
  }, []);

  const handleCoinSelector = useCallback(
    (type: 'to' | 'from', coin: CoinType) => {
      setExchangeData(prev => ({
        fromCoin: type === 'from' ? coin : prev.fromCoin,
        toCoin: type === 'to' ? coin : prev.toCoin,
        fromAmount:
          type === 'from'
            ? calculateCoinExchange({
                fromCoin: prev.toCoin,
                toCoin: coin,
                amount: parseFloat(prev.toAmount),
              }).toString()
            : prev.fromAmount,
        toAmount:
          type === 'to'
            ? calculateCoinExchange({
                fromCoin: prev.fromCoin,
                toCoin: coin,
                amount: parseFloat(prev.fromAmount),
              }).toString()
            : prev.toAmount,
      }));
    },
    [],
  );
  const handleAmountChange = useCallback(
    (type: 'to' | 'from', event: React.ChangeEvent<HTMLInputElement>) => {
      const decimalValue = event.target.value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');

      if (
        decimalValue.includes('.') &&
        decimalValue.split('.')[1]?.length > 10
      ) {
        return;
      }

      if (isNaN(parseFloat(decimalValue))) {
        setExchangeData(prev => ({
          ...prev,
          fromAmount: '',
          toAmount: '',
        }));
        return;
      }

      setExchangeData(prev => ({
        ...prev,
        fromAmount:
          type === 'from'
            ? decimalValue
            : calculateCoinExchange({
                fromCoin: prev.toCoin,
                toCoin: prev.fromCoin,
                amount: parseFloat(decimalValue),
              }).toString(),
        toAmount:
          type === 'to'
            ? decimalValue
            : calculateCoinExchange({
                fromCoin: prev.fromCoin,
                toCoin: prev.toCoin,
                amount: parseFloat(decimalValue),
              }).toString(),
      }));
    },
    [],
  );

  const handleInputError = useCallback(() => {
    const inputValue = parseFloat(fromAmount);
    return (
      inputValue === 0 || inputValue > wallet[fromCoin] || isNaN(inputValue)
    );
  }, [fromAmount, fromCoin, wallet]);

  const handleButtonClick = useCallback(() => {
    if (!handleInputError()) {
      dispatch(
        exchangeCoin({
          fromCoin,
          toCoin,
          fromAmount: parseFloat(fromAmount),
          toAmount: parseFloat(toAmount),
        }),
      );
      setExchangeData(INITIAL_EXCHANGE_DATA);
    }
  }, [dispatch, fromAmount, fromCoin, handleInputError, toAmount, toCoin]);

  return (
    <ExchangerBox>
      <HStack>
        <ExchangerInput
          label="전환수량 (from)"
          value={fromAmount}
          onChange={e => handleAmountChange('from', e)}
          hasError={!fromAmount || handleInputError()}
        />
        <CoinSelector
          selectedCoin={COIN[fromCoin]}
          disabledCoin={COIN[toCoin].type}
          onSelect={coin => handleCoinSelector('from', coin)}
        />
      </HStack>
      <button onClick={handleCoinSwap}>
        <Icon name="swap" width={40} height={40} />
      </button>
      <HStack>
        <ExchangerInput
          label="전환수량 (to)"
          value={toAmount}
          onChange={e => handleAmountChange('to', e)}
          hasError={!toAmount || toAmount === '0'}
        />
        <CoinSelector
          selectedCoin={COIN[toCoin]}
          disabledCoin={COIN[fromCoin].type}
          onSelect={coin => handleCoinSelector('to', coin)}
        />
      </HStack>
      <Button
        label="환전"
        onClick={handleButtonClick}
        disabled={!fromAmount || handleInputError()}
      />
      {recentHistory && <HistoryBar history={recentHistory} />}
    </ExchangerBox>
  );
};

export default Exchanger;
