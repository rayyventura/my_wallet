import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import { AppWrapper } from '../contexts/state';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <ChakraProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </ChakraProvider>
    </AppWrapper>
  );
}

export default MyApp;
