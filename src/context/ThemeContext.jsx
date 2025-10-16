import React, {createContext, useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const ThemeContext = createContext();


export const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useLocalStorage("theme", "light");

    React.useEffect(()=>{
        const root =  document.documentElement;
        if(theme === "dark")root.classList.add("dark");
        else root.classList.remove("dark");
    },[theme]);

    const toggle = ()=> setTheme(prev =>(prev==="dark"? "light":"dark"));

    return(
        <ThemeContext.Provider value={{theme, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useTheme = ()=> useContext(ThemeContext);