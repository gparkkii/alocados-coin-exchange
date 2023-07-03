import React, { memo } from 'react';
import { ReactComponent as ArrowDown } from 'assets/Icon/ArrowDown.svg';
import { ReactComponent as BnB } from 'assets/Icon/BnB.svg';
import { ReactComponent as ChevronDown } from 'assets/Icon/ChevronDown.svg';
import { ReactComponent as ChevronRight } from 'assets/Icon/ChevronRight.svg';
import { ReactComponent as Ethereum } from 'assets/Icon/Ethereum.svg';
import { ReactComponent as Solana } from 'assets/Icon/Solana.svg';
import { ReactComponent as Swap } from 'assets/Icon/Swap.svg';

type IconType =
  | 'arrowDown'
  | 'chevronDown'
  | 'chevronRight'
  | 'swap'
  | 'ethereum'
  | 'solana'
  | 'bnb';

interface IconProps {
  name: IconType;
}

const Icon = ({ name }: IconProps) => {
  switch (name) {
    case 'arrowDown':
      return <ArrowDown />;
    case 'chevronDown':
      return <ChevronDown />;
    case 'chevronRight':
      return <ChevronRight />;
    case 'swap':
      return <Swap />;
    case 'ethereum':
      return <Ethereum />;
    case 'solana':
      return <Solana />;
    case 'bnb':
      return <BnB />;
    default:
      return null;
  }
};

export default memo(Icon);
