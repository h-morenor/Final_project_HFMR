import React from 'react'
import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
const [groups, setGroups] = useState ()

return(
<DataContext.Provider value={[groups, setGroups]}>
    {children}
</DataContext.Provider>
);

}