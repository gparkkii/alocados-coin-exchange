import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinType, ExchangeHistoryType } from '@types';

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
  action: PayloadAction<{
    fromCoin: CoinType;
    toCoin: CoinType;
    fromAmount: number;
    toAmount: number;
  }>,
) => {
  const { fromCoin, toCoin, fromAmount, toAmount } = action.payload;

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

  console.log(action.payload);

  state[fromCoin] -= fromAmount;
  state[toCoin] += toAmount;
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
