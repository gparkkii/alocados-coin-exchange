import { CoinType, CoinInfoType } from '@types';

export const COIN: {
  [key in CoinType]: CoinInfoType;
} = {
  ethereum: {
    type: 'ethereum',
    name: 'Ethereum',
    unit: 'ETH',
  },
  solana: {
    type: 'solana',
    name: 'Solana',
    unit: 'SOL',
  },
  bnb: {
    type: 'bnb',
    name: 'BnB',
    unit: 'BnB',
  },
};
