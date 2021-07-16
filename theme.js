import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Lato',
        backgroundColor: '#f9f9f9'
      }
    }
  },
  components: {
    FormLabel: {
      baseStyle: {
        mb: 1
      }
    }
  }
});

export default theme;
