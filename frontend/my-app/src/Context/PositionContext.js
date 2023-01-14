import React from 'react'
import { createContext, useState } from 'react';

export const PositionContext = createContext();

export const DataProvider = ({children}) => {
const [position, setposition] = useState ([])

return(
<PositionContext.Provider value={[position, setposition]}>
    {children}
</PositionContext.Provider>
);

}

