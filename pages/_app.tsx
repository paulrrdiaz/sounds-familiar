import '@/styles/globals.css';
import 'nprogress/nprogress.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import nprogress from 'nprogress';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme';
import { AppContextProvider } from '@/context';
import PlaylistsModal from '@/components/PlaylistsModal';

nprogress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());
Router.events.on('routeChangeError', () => nprogress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Component {...pageProps} />
        <PlaylistsModal />
      </AppContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
