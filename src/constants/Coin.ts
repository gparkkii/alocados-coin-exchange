import { CoinType, CoinInfoType } from '@types';

export const COIN: {
  [key in CoinType]: CoinInfoType;
} = {
  ethereum: {
    icon: 'ethereum',
    name: 'Ethereum',
    unit: 'ETH',
  },
  solana: {
    icon: 'solana',
    name: 'Solana',
    unit: 'SOL',
  },
  bnb: {
    icon: 'bnb',
    name: 'BnB',
    unit: 'BnB',
  },
};
