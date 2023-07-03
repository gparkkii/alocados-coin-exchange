import 'styled-components';
import { backgroundStyle } from './background';
import { color } from './colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof color;
    backgroundStyle: typeof backgroundStyle;
  }
}
