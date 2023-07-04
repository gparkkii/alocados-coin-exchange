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

const OptionBadge = styled.div<{ selected?: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.43 : 1)};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.shade100 : theme.colors.white};
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
  selected: boolean;
  disabled: boolean;
  coin: CoinInfoType;
  onClick: (name: CoinType) => void;
}

const OptionButton = ({
  disabled,
  selected,
  coin,
  onClick,
}: OptionButtonProps) => {
  return (
    <OptionBadge
      disabled={disabled}
      selected={selected}
      onClick={() => onClick(coin.type)}
    >
      <OptionLabel>
        <Icon name={coin.type} width={18} height={18} />
        {coin.name}
      </OptionLabel>
    </OptionBadge>
  );
};

interface CoinSelectorProps {
  onSelect: (coin: CoinType) => void;
  selectedCoin: CoinInfoType;
  disabledCoin?: CoinType;
}

const CoinSelector = ({
  onSelect,
  selectedCoin,
  disabledCoin,
}: CoinSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionBoxRef = useRef<HTMLDivElement>(null);

  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (coin: CoinType) => {
    if (coin === disabledCoin || coin === selectedCoin.type) {
      return;
    }
    onSelect(coin);
    setIsOpen(false);
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
          <Icon name={selectedCoin.type} width={18} height={18} />
          {selectedCoin.name}
        </OptionLabel>
        <Icon name="chevronDown" width={24} height={24} />
      </SelectorBox>
      <OptionBox $isOpen={isOpen}>
        {Object.values(COIN).map(coin => (
          <OptionButton
            key={coin.name}
            disabled={disabledCoin === coin.type}
            selected={selectedCoin.type === coin.type}
            coin={coin}
            onClick={handleOptionClick}
          />
        ))}
      </OptionBox>
    </Wrapper>
  );
};

export default CoinSelector;
