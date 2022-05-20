import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [componentMounted, setComponentMounted] = useState(false);

    const setMode = (mode: string) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const toggleTheme = () => {
        if (theme === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
        document.location.reload()
    };

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const localTheme =  window.localStorage.getItem('theme');
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
            setMode('dark') :
            localTheme ?
                setTheme(localTheme) :
                setMode('light'); 
        }
       
    });


    return [theme, toggleTheme, componentMounted] as const //https://fettblog.eu/typescript-react-typeing-custom-hooks/
};