import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { generateTitle } from '../utils/generateTitle'
import toast from 'react-hot-toast'
import axiosInstance from '../config/axiosInstance'
import useAppContext from '../context/useContext'
import ChatItemSkeleton from './skeletion/ChatItemSkeletion'
import { useQuery } from '@tanstack/react-query'
import { ChatListInterface } from '../types/app.type'

const ChatList = () => {


  // const [loading,setLoading] = useState<boolean>(true);
  // const { chatList,setChatList} = useAppContext();


  const fetchChatList = async () => {
  const res = await axiosInstance("/api/chats/user/history");
  if (!res.data.success) {
    throw new Error(res.data.response);
  }
  return res.data.data ?? [];
};




  const {
  data: chatList,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["chat-list"],
  queryFn:fetchChatList,
});



useEffect(() => {
  if (isError) {
    toast.error(error.message);
  }
}, [isError, error]);

  // const fetchChatListApi = async ()=>{
  //   try {
  //     const res = await axiosInstance("/api/chats/user/history");
      
  //     if(res?.data?.success){
  //       return setChatList(res?.data?.data ?? []);
  //     }
  //     else{
  //       return toast.error(res?.data?.resposne);
  //     }
  //   } catch (error) {
  //      return toast.error(
  //       "Technical issue occured while fetching chat list. Please refresh the page and try again later."
  //       );
  //   }
  //   finally{
  //     setLoading(false);
  //   }
  // };



  // React.useEffect(()=>{
  //   fetchChatListApi();
  // },[]);


  return (
    <div 
    id='chatList'
    // className=' h-screen overflow-auto flex flex-col px-[20px] py-[20px]'
      className="h-full flex flex-col px-[20px] py-[20px] 
      overflow-y-auto
       overflow-x-hidden custom-scrollbar"
    >
        <span
        className='font-semibold text-sm sm:text-base mb-4'
        >Dashboard</span>
        <Link to={"/dashboard"}
        className=' hover:bg-[#2c2937] px-[10px] py-[7px] rounded-[10px]'
        >Create A New Chat</Link>
        <Link to={"/"}
        className=' hover:bg-[#2c2937] px-[10px] py-[7px] rounded-[10px]'
        >Explore CORTEX AI</Link>
        <Link to={"/"}
        className=' hover:bg-[#2c2937] px-[10px] py-[7px] rounded-[10px]'
        >Contact</Link>
        <hr className='border-none h-[2px]
         bg-[#ddd] opacity-[.4] rounded-[5px] 
          my-[20px] 
          mx-0
          '/>
          <span id="title"
           className='font-semibold text-sm sm:text-base mb-4' > RECENT CHATS </span>

  {/*CHAT HISTORY START */}
  


  <div
  //  className="flex flex-col gap-1"
  className='flex-1 flex flex-col gap-1 overflow-hide
   text-[12.5px] sm:text-[14px]'
  >
    {
      isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
  <ChatItemSkeleton key={i} />
))
    ):(
      chatList && chatList?.length > 0 && (
        chatList.map((item:ChatListInterface, index:number) => (
          <Link
            key={index}
            to={`/chats/${item?._id}`}
            className="
    hover:bg-[#2c2937]
    px-[10px] py-[7px]
    rounded-[10px]
    text-sm text-gray-300
    truncate
    transition-all duration-300 ease-out
    hover:text-gray-100
    hover:translate-x-[1px]
  "
        >
            {generateTitle(item?.title ?? "")}
          </Link>
        ))
      )


        
      )
    }


      
    </div>
  {/*CHAT HISTORY END */}
   <hr className='border-none h-[2px]
         bg-[#ddd] opacity-[.4] rounded-[5px] 
          my-[20px] 
          mx-0
          '/>

  <div
  id="upgrade"
  // className="flex items-center mt-auto text-[12px] sm:text-[14px] gap-[10px]  "
  className="flex items-center text-[12px] sm:text-[14px] gap-[10px]  "
  >
    <img 
    src="/logo.png"
     alt="app-logo"
      className="pointer-events-none 
      max-w-16 h-16 w-full "
      />
    <div className='flex flex-col text-[12px]  sm:text-sm tracking-tight '>
        <span className='font-semibold'> Upgrade to CORTEX AI Pro </span>
        <span className='text-gray font-medium'> Get unlimited access to all features</span>
    </div>




  </div>







    </div>
  )
}

export default ChatList

