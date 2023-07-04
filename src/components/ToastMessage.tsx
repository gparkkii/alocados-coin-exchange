import React from 'react';
import { styled } from 'styled-components';
import Icon from './Icon';
import { Body } from 'styles/typography';

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.infoBg};
`;

const TextBox = styled.div`
  width: 100%;
`;

interface ToastProps {
  isOpen: boolean;
  message: string;
  onClose?: () => void;
}

const ToastMessage = ({ isOpen, message, onClose }: ToastProps) => {
  return (
    <>
      {isOpen && (
        <ToastContainer>
          <Icon name="info" width={20} height={20} />
          <TextBox>
            <Body $textcolor="info">{message}</Body>
          </TextBox>
          <button onClick={onClose}>
            <Icon name="close" width={24} height={24} />
          </button>
        </ToastContainer>
      )}
    </>
  );
};

export default ToastMessage;
