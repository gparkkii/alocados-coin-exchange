export type CoinType = 'ethereum' | 'solana' | 'bnb';

export interface CoinExchangeProps {
  fromCoin: CoinType;
  toCoin: CoinType;
  amount: number;
}

export type ExchangeHistoryItemType = { type: CoinType; amount: number };
export type ExchangeHistoryType = {
  from: ExchangeHistoryItemType;
  to: ExchangeHistoryItemType;
  timestamp: number;
};
