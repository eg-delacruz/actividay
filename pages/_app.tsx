import "@styles/globals.scss";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

//Redux
import { Provider } from "react-redux";
import { wrapper } from "@redux/configureStore";

//Fonts
import { rubik, nunito_sans } from "@font/font";

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={false} defaultTheme="light">
        <div className={`${rubik.variable} ${nunito_sans.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
