import 'styled-components';
import { backgroundStyle } from './background';
import { colors } from './colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    backgroundStyle: typeof backgroundStyle;
  }
}
