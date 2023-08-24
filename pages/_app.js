import { ApiKeyProvider } from '../components/ApiKeyContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <ApiKeyProvider>
       <Head>
        <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
        <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
        {/* Add more HERE Map API scripts as needed */}
      </Head>
      <Component {...pageProps} />
    </ApiKeyProvider>
  );
}

export default MyApp;
