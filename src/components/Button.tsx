import React from 'react';
import { styled } from 'styled-components';
import { ButtonText } from 'styles/typography';

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  margin-top: 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary100};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.shade200};
  }
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick} disabled={disabled}>
      <ButtonText $textcolor={disabled ? 'shade400' : 'white'}>
        {label}
      </ButtonText>
    </ButtonWrapper>
  );
};

export default Button;
