import { CoinType } from '../@types';

export type ExchangeRateType = {
  [from in CoinType]: Partial<Record<CoinType, number>>;
};

const ETH_TO_SOLANA = 100;
const ETH_TO_BNB = 50;

const SOL_TO_ETH = 1 / ETH_TO_SOLANA;
const SOL_TO_BNB = ETH_TO_BNB / ETH_TO_SOLANA;

const BNB_TO_ETH = 1 / ETH_TO_BNB;
const BNB_TO_SOL = 1 / SOL_TO_BNB;

const EXCHANGE_RATES: ExchangeRateType = {
  ethereum: {
    solana: ETH_TO_SOLANA,
    bnb: ETH_TO_BNB,
  },
  solana: {
    ethereum: SOL_TO_ETH,
    bnb: SOL_TO_BNB,
  },
  bnb: {
    ethereum: BNB_TO_ETH,
    solana: BNB_TO_SOL,
  },
};

interface CoinExchangeProps {
  fromCoin: CoinType;
  toCoin: CoinType;
  amount: number;
}

export const calculateCoinExchange = ({
  fromCoin,
  toCoin,
  amount,
}: CoinExchangeProps): number => {
  const exchangeRate = EXCHANGE_RATES[fromCoin][toCoin];
  if (!exchangeRate) {
    return 0;
  }
  return amount * exchangeRate;
};
