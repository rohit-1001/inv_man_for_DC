import React, { createContext, useState } from "react";

export const Context = createContext({
  role: "visitor",
  setRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [role, setRole] = useState("visitor");

  return (
    <Context.Provider value={{ role, setRole }}>{children}</Context.Provider>
  );
};

export const ContextConsumer = ({ children }) => {
  const { role, setRole } = React.useContext(Context);

  return children({ role, setRole });
};