import React, { useState, useEffect, useRef, useCallback } from 'react';
import { styled } from 'styled-components';
import { CoinInfoType, CoinType } from '@types';
import Icon from 'components/Icon';
import { COIN } from 'constants/Coin';
import { Caption1 } from 'styles/typography';

const Wrapper = styled.div`
  position: relative;
`;

const SelectorBox = styled.div`
  ${({ theme }) => theme.backgroundStyle.shade000};
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 147px;
  height: 56px;
  padding: 10px;
  gap: 4px;
`;

const OptionBox = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  z-index: 999;

  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  width: 153px;
  height: 184px;
  padding: 8px 0px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.shade000};
  box-shadow: 0px 12px 16px 0px rgba(0, 0, 0, 0.15);
`;

const OptionBadge = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.shade100};
  }
`;

const OptionLabel = styled(Caption1)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 4px;
`;

interface OptionButtonProps {
  coin: CoinInfoType;
  onClick: (name: CoinType) => void;
}
const OptionButton = ({ coin, onClick }: OptionButtonProps) => {
  return (
    <OptionBadge onClick={() => onClick(coin.icon)}>
      <OptionLabel>
        <Icon name={coin.icon} width={18} height={18} />
        {coin.name}
      </OptionLabel>
    </OptionBadge>
  );
};

interface CoinSelectorProps {
  selectedCoin: CoinInfoType;
  onSelect: (coin: CoinType) => void;
}

const CoinSelector = ({ selectedCoin, onSelect }: CoinSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionBoxRef = useRef<HTMLDivElement>(null);

  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (coin: CoinType) => {
    setIsOpen(false);
    onSelect(coin);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        optionBoxRef.current &&
        !optionBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Wrapper ref={optionBoxRef}>
      <SelectorBox onClick={handleSelectorClick}>
        <OptionLabel>
          <Icon name={selectedCoin.icon} width={18} height={18} />
          {selectedCoin.name}
        </OptionLabel>
        <Icon name="chevronDown" width={24} height={24} />
      </SelectorBox>
      <OptionBox $isOpen={isOpen}>
        <OptionButton coin={COIN.bnb} onClick={handleOptionClick} />
        <OptionButton coin={COIN.solana} onClick={handleOptionClick} />
        <OptionButton coin={COIN.ethereum} onClick={handleOptionClick} />
      </OptionBox>
    </Wrapper>
  );
};

export default CoinSelector;
