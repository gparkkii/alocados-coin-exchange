import { styled } from 'styled-components';
import { ColorType } from '../theme/color';

interface TypographyStyleProps {
  textcolor?: ColorType;
}

export const Title1 = styled.h3<TypographyStyleProps>`
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Strong = styled.strong<TypographyStyleProps>`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Body2 = styled.p<TypographyStyleProps>`
  font-size: 18px;
  font-family: Poppins;
  font-weight: 400;
  line-height: 178%;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Body2Bold = styled.p<TypographyStyleProps>`
  font-size: 18px;
  font-family: Poppins;
  font-weight: 600;
  line-height: 178%;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Button = styled.p<TypographyStyleProps>`
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.75px;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Filter = styled.p<TypographyStyleProps>`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  line-height: 178%;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Caption1 = styled.p<TypographyStyleProps>`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 178%;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;

export const Overline = styled.p<TypographyStyleProps>`
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.shade900};
`;
