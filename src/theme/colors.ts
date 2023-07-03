export type ColorType = keyof typeof colors;

export const colors = {
  primary100: '#5D28F2',
  primary24: '#5D28F21F',
  shade000: '#FAFBFC',
  shade100: '#F4F5F8',
  shade300: '#C8CCD7',
  shade600: '#546182',
  shade700: '#404E71',
  shade750: '#4C5B7A',
  shade800: '#313C57',
  shade900: '#2A3249',
  shadeOpacity5: '#2A32490D',
  white: '#FFFFFF',
} as const;
