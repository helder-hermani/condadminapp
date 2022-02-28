import {createContext, useContext, useState} from 'react';

export const listActionBarContext = createContext({});

export  function ListActionBarProvider({children}){
    const [hasSelection, setHasSelection] = useState(false);    

    return(
        <listActionBarContext.Provider value={{hasSelection, setHasSelection}}>
            {children}
        </listActionBarContext.Provider>
    )
}