import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import CoinSelector from './CoinSelector';
import ExchangerInput from './ExchangerInput';
import { CoinType } from '@types';
import Button from 'components/Button';
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

const Exchanger = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);

  const [exchangeData, setExchangeData] = useState<{
    fromCoin: CoinType;
    toCoin: CoinType;
    fromAmount: number;
    toAmount: number;
  }>({
    fromCoin: 'ethereum',
    toCoin: 'solana',
    fromAmount: 1,
    toAmount: calculateCoinExchange({
      fromCoin: 'ethereum',
      toCoin: 'solana',
      amount: 1,
    }),
  });
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
      setExchangeData(prev => {
        const updatedData = {
          fromCoin: type === 'from' ? coin : prev.fromCoin,
          toCoin: type === 'to' ? coin : prev.toCoin,
          fromAmount:
            type === 'from'
              ? calculateCoinExchange({
                  fromCoin: prev.toCoin,
                  toCoin: coin,
                  amount: prev.toAmount,
                })
              : prev.fromAmount,
          toAmount:
            type === 'to'
              ? calculateCoinExchange({
                  fromCoin: prev.fromCoin,
                  toCoin: coin,
                  amount: prev.fromAmount,
                })
              : prev.toAmount,
        };
        return updatedData;
      });
    },
    [],
  );
  const handleAmountChange = useCallback(
    (type: 'to' | 'from', event: React.ChangeEvent<HTMLInputElement>) => {
      const decimalValue = parseFloat(
        event.target.value.replace(/[^0-9.]/g, ''),
      ).toFixed(10);
      const parsedValue = parseFloat(decimalValue);

      setExchangeData(prev => {
        const updatedData = {
          ...prev,
          fromAmount:
            type === 'from'
              ? parsedValue
              : calculateCoinExchange({
                  fromCoin: prev.toCoin,
                  toCoin: prev.fromCoin,
                  amount: parsedValue,
                }),
          toAmount:
            type === 'to'
              ? parsedValue
              : calculateCoinExchange({
                  fromCoin: prev.fromCoin,
                  toCoin: prev.toCoin,
                  amount: parsedValue,
                }),
        };
        return updatedData;
      });
    },
    [],
  );

  const handleInputError = useCallback(
    (type: 'from' | 'to') => {
      const currentAsset = type === 'from' ? wallet[fromCoin] : wallet[toCoin];
      const inputValue = type === 'from' ? fromAmount : toAmount;
      return inputValue === 0 || inputValue > currentAsset;
    },
    [fromAmount, toAmount, fromCoin, toCoin, wallet],
  );

  const handleExchange = useCallback(() => {
    if (fromAmount > 0 && fromAmount <= wallet[toCoin]) {
      dispatch(exchangeCoin({ fromCoin, toCoin, fromAmount, toAmount }));
    }
  }, [dispatch, fromAmount, toAmount, fromCoin, toCoin, wallet]);

  const handleButtonClick = useCallback(() => {
    if (!handleInputError('from')) {
      handleExchange();
    }
  }, [handleExchange, handleInputError]);

  return (
    <ExchangerBox>
      <HStack>
        <ExchangerInput
          label="전환수량 (from)"
          value={fromAmount}
          onChange={e => handleAmountChange('from', e)}
          hasError={!fromAmount || handleInputError('from')}
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
          hasError={!toAmount}
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
        disabled={!fromAmount || handleInputError('from')}
      />
    </ExchangerBox>
  );
};

export default Exchanger;
