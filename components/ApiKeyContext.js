import { createContext, useContext, useState } from 'react';

const ApiKeyContext = createContext();

export const useApiKey = () => {
  return useContext(ApiKeyContext);
};

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  const updateApiKey = (key) => {
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, updateApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
