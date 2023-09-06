import { ApiKeyProvider } from '../components/ApiKeyContext';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApiKeyProvider>
        <Head>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
          <script src="<https://unpkg.com/mqtt/dist/mqtt.min.js>"></script>
          {/* Add more HERE Map API scripts as needed */}
        </Head>
        <Component {...pageProps} />
      </ApiKeyProvider>
    </SessionProvider>
  );
}

export default MyApp;
