import React, { useState,useContext } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme",theme)
    console.log("local in context",localStorage.getItem('theme'));
  };

  return (
    <Context.Provider
      value={{
        theme: theme || "light",
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const useThemeContext = () => useContext(Context);

export default Provider;
