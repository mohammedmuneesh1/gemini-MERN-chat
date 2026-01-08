import { createContext } from "react";
import React from "react"; 
import { ChatListInterface } from "../types/app.type";


export interface AppContextInterface{
    openLoginModal:boolean;
    setOpenLoginModal:React.Dispatch<React.SetStateAction<boolean>>;
    chatList:ChatListInterface[];
    setChatList:React.Dispatch<React.SetStateAction<ChatListInterface[]>>;
}


export const appContext = createContext<AppContextInterface | null>(null);





 const AppContextProvider = ({children}:{children:React.ReactNode}) => {

    const [openLoginModal,setOpenLoginModal] = React.useState<boolean>(false);
    const [chatList,setChatList] = React.useState<ChatListInterface[]>([]);



    return(
        <appContext.Provider value={{
            openLoginModal,setOpenLoginModal,
            chatList,setChatList
        }}>
        {children}
        </appContext.Provider>
    )
}

export default AppContextProvider;






