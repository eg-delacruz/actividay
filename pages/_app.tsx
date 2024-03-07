import '@styles/globals.scss';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

//Redux
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { makeStore } from '@redux/configureStore';

//Fonts
import { rubik, nunito_sans } from '@font/font';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} defaultTheme={'light'}>
      <div className={`${rubik.variable} ${nunito_sans.variable}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
