import { theme } from '@chakra-ui/core';

const appTheme = {
  ...theme,
  styles: {
    ...theme.styles,
    global: {
      body: {
        color: 'rgba(68, 68, 68)'
      }
    }
  }
};

export default appTheme;
