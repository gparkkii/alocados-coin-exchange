import React from 'react';
import { styled } from 'styled-components';
import { Overline } from 'styles/typography';

const ExchangerInputBox = styled.div`
  ${({ theme }) => theme.backgroundStyle.shade000};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 56px;
  padding-left: 14px;
  padding-right: 16px;
`;

const ExchangerInputStyle = styled.input`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.shade800};
  font-size: 18px;
  font-weight: 600;
`;

interface ExchangerInputProps {
  label: string;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const ExchangerInput = ({
  label,
  value,
  onChange,
  disabled,
}: ExchangerInputProps) => {
  return (
    <ExchangerInputBox>
      <Overline>{label}</Overline>
      <ExchangerInputStyle
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </ExchangerInputBox>
  );
};

export default ExchangerInput;
