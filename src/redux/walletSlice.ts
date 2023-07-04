import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinType, ExchangeHistoryType } from '@types';

export type WalletState = {
  [key in CoinType]: number;
} & {
  exchangeHistory: ExchangeHistoryType[];
  transactionUpdated: boolean;
};

const DEFAULT_ASSET = 1000;

const initialState: WalletState = {
  ethereum: DEFAULT_ASSET,
  solana: DEFAULT_ASSET,
  bnb: DEFAULT_ASSET,
  exchangeHistory: [],
  transactionUpdated: false,
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
      amount: fromAmount,
    },
    to: {
      type: toCoin,
      amount: toAmount,
    },
    timestamp: Date.now(),
  };

  state[fromCoin] -= fromAmount;
  state[toCoin] += toAmount;
  state.exchangeHistory.push(exchangeHistoryItem);
  state.transactionUpdated = true;
};

const updateTransactionReducer = (
  state: WalletState,
  action: PayloadAction<boolean>,
) => {
  state.transactionUpdated = action.payload;
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    exchangeCoin: exchangeCoinReducer,
    updateTransaction: updateTransactionReducer,
  },
});

export const { exchangeCoin, updateTransaction } = walletSlice.actions;
export default walletSlice.reducer;
