import React from 'react';
import { styled } from 'styled-components';
import { Overline } from 'styles/typography';

const ExchangerInputBox = styled.div<{ $hasError?: boolean }>`
  ${({ theme }) => theme.backgroundStyle.shade000};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 56px;
  padding-left: 14px;
  padding-right: 16px;
  border: ${({ theme, $hasError }) =>
    $hasError ? `1.2px solid ${theme.colors.error}` : '0px'};
`;

const ExchangerInputStyle = styled.input`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.shade800};
  font-size: 18px;
  font-weight: 600;
`;

interface ExchangerInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  hasError: boolean;
}

const ExchangerInput = ({
  label,
  value,
  onChange,
  hasError,
}: ExchangerInputProps) => {
  return (
    <ExchangerInputBox $hasError={hasError}>
      <Overline>{label}</Overline>
      <ExchangerInputStyle type="text" value={value} onChange={onChange} />
    </ExchangerInputBox>
  );
};

export default ExchangerInput;
