import { createContext, useContext, useState } from 'react';

const VariableContext = createContext();

export const MyProvider = ({ children }) => {
    const [myVariable, setMyVariable] = useState(null);
  
    return (
      <VariableContext.Provider value={{ myVariable, setMyVariable }}>
        {children}
      </VariableContext.Provider>
    );
};
export const useMyContext = () => {
    return useContext(VariableContext);
};