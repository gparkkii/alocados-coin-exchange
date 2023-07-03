import 'styled-components';
import { color } from './color';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof color;
  }
}
