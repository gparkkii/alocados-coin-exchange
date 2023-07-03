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
  width?: string | number;
  height?: string | number;
}

const Icon = ({ name, width, height }: IconProps) => {
  switch (name) {
    case 'arrowDown':
      return <ArrowDown width={width} height={height} />;
    case 'chevronDown':
      return <ChevronDown width={width} height={height} />;
    case 'chevronRight':
      return <ChevronRight width={width} height={height} />;
    case 'swap':
      return <Swap width={width} height={height} />;
    case 'ethereum':
      return <Ethereum width={width} height={height} />;
    case 'solana':
      return <Solana width={width} height={height} />;
    case 'bnb':
      return <BnB width={width} height={height} />;
    default:
      return null;
  }
};

export default memo(Icon);
