export type ColorType = keyof typeof colors;

export const colors = {
  primary100: '#5D28F2',
  primary24: '#5D28F21F',
  shade000: '#FAFBFC',
  shade100: '#F4F5F8',
  shade200: '#E0E2E8',
  shade300: '#C8CCD7',
  shade400: '#A9B0C1',
  shade600: '#546182',
  shade700: '#404E71',
  shade750: '#4C5B7A',
  shade800: '#313C57',
  shade900: '#2A3249',
  shadeOpacity5: '#2A32490D',
  infoBg: '#3756E41F',
  info: '#3756E4',
  error: '#F7254B',
  white: '#FFFFFF',
} as const;
