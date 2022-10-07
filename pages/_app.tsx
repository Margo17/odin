import { ChakraProvider } from "@chakra-ui/react";

import nookies from "nookies";
import { config } from "../firebase/client_side_config";
import theme from "../theme";
import App, { AppContext, AppProps } from "next/app";
import { UserProvider } from "../Providers/user";
import { appWithTranslation } from "next-i18next";
import { ClientSideProvider } from "../Providers/client_side";
import { AuthProvider } from "../Providers/authentication";
import axios from "axios";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ClientSideProvider config={config}>
        <AuthProvider>
          <UserProvider user={pageProps.user}>
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </ClientSideProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const appProps = await App.getInitialProps(appContext);
  const cookies = nookies.get(ctx);
  const { token } = cookies;
  if (token) {
    // eslint-disable-next-line
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_PREFIX}api/validate`,
        {
          headers: {
            "Context-Type": "application/json",
            Authorization: JSON.stringify({ token }),
          },
        }
      );
      if (result.data) appProps.pageProps.user = result.data;
    } catch (e) {
      // eslint-disable-next-line
      throw e;
    }
  }
  return { ...appProps };
};
export default appWithTranslation(MyApp);
