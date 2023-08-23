import { ApiKeyProvider } from '../components/ApiKeyContext';

function MyApp({ Component, pageProps }) {
  return (
    <ApiKeyProvider>
      <Component {...pageProps} />
    </ApiKeyProvider>
  );
}

export default MyApp;
