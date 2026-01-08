

import React from 'react'
import { useContext } from "react";
import { appContext } from './AppContextProvider';

const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
    return context;
    
}

export default useAppContext;