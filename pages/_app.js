import { ApiKeyProvider } from '../components/ApiKeyContext';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { MyProvider } from '../components/VariableContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApiKeyProvider>
        <MyProvider>
          <Head>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
          <script type="text/javascript" charset="utf-8" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" ></script>
          <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
          <script src="<https://unpkg.com/mqtt/dist/mqtt.min.js>"></script>
            
            {/* Add more HERE Map API scripts as needed */}
          </Head>
          <Component {...pageProps} />
        </MyProvider>
      </ApiKeyProvider>
    </SessionProvider>
  );
}

export default MyApp;
