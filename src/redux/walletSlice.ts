import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinExchangeProps, CoinType, ExchangeHistoryType } from '../@types';
import { calculateCoinExchange } from '../utils/exchangeRate';

export type WalletState = {
  [key in CoinType]: number;
} & {
  exchangeHistory: ExchangeHistoryType[];
};

const DEFAULT_ASSET = 1000;

const initialState: WalletState = {
  ethereum: DEFAULT_ASSET,
  solana: DEFAULT_ASSET,
  bnb: DEFAULT_ASSET,
  exchangeHistory: [],
};

const exchangeCoinReducer = (
  state: WalletState,
  action: PayloadAction<CoinExchangeProps>,
) => {
  const { fromCoin, toCoin, amount } = action.payload;

  const exchangeHistoryItem: ExchangeHistoryType = {
    from: {
      type: fromCoin,
      amount: state[fromCoin],
    },
    to: {
      type: toCoin,
      amount: state[toCoin],
    },
    timestamp: Date.now(),
  };

  const exchangedCoin = calculateCoinExchange({ fromCoin, toCoin, amount });

  state[fromCoin] -= amount;
  state[toCoin] += exchangedCoin;
  state.exchangeHistory.push(exchangeHistoryItem);
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    exchangeCoin: exchangeCoinReducer,
  },
});

export const { exchangeCoin } = walletSlice.actions;
export default walletSlice.reducer;
