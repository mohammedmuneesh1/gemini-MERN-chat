import React from 'react'
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import useAppContext from '../../context/useContext';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DashboardPage = () => {

  const { setChatList} = useAppContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();


  
  const createNewChatApi = async (text: string) => {
    // toast.loading("Creating new chat...");
  const res = await axiosInstance.post("/api/chats/", { text });

  if (!res.data.success) {
    throw new Error(res.data.message);
  }

  return res.data.data; // return the new chat object
};





const createChatMutation = useMutation({
  mutationFn: createNewChatApi,
  //Runs immediately when mutate() is called,Runs before createNewChatApi
  //Purpose: prepare cache, snapshot current data, prevent race conditions

//   onMutate: async (newChatText) => {
//     //Cancels any in-flight request for ["chat-list"],Does NOT delete cached data,Does NOT refetch,Just stops ongoing fetches
//   //Why this matters Imagine this scenario:, 
//   // Chat list is refetching, User submits new chat,
//   //  Old request finishes after mutation, 
//   // Old response overwrites fresh data
//       // Cancel any ongoing fetches
//     // await queryClient.cancelQueries({ queryKey: ["chat-list"] });
// // Reads the current cached data, Does NOT trigger a fetch, Does NOT change anything, Pure read
//   // Snapshot current state
//     // const previousChats = queryClient.getQueryData<any[]>(["chat-list"]);

//    // ⚠️⚠️ Optimistically update the UI ⚠️⚠️
//     //    queryClient.setQueryData(["chat-list"], (old: any[] = []) => [
//     //   {
//     //     _id: "temp-id-" + Date.now(), // Unique temp ID
//     //     title: newChatText.substring(0, 40), // Show first 40 chars as title
//     //     createdAt: new Date().toISOString(),
//     //     isOptimistic: true, // Flag for styling/indication
//     //   },
//     //   ...old,
//     // ]);

//     // return { previousChats };
   
   

//     // queryClient.setQueryData(["chat-list"], (old: any[] = []) => [
//     //   {
//     //     _id: "temp-id",
//     //     text: newChatText,
//     //     isOptimistic: true,
//     //   },
//     //   ...old,
//     // ]);

//     // return { previousChats };
//   },

  onError: (error) => {
    toast.error("Failed to create chat");
    console.error(error);
  },
  onSuccess: (newChat) => {
    // Add the real chat to the list
    queryClient.setQueryData(["chat-list"], (old: any[] = []) => [
      newChat,
      ...old,
    ]);

    navigate(`/chats/${newChat._id}`);
    // toast.success("Chat created");
  },

  // Optional: refetch to ensure consistency with server
  // onSettled: () => {
  //   queryClient.invalidateQueries({ queryKey: ["chat-list"] });
  // },

});











  const formSubmitFn =async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const formData = e.currentTarget;
    const prompt = (e.target as HTMLFormElement).text.value;

    if(!prompt) return;
    //mutate(prompt) does go to createNewChatApi
      createChatMutation.mutate(prompt);


    // try {
    // const res =await axiosInstance.post("/api/chats/",{
    //   text: prompt,
    // });
    // console.log('res',res?.data);


    // if(res?.data?.success){
    //   navigate(`/chats/${res?.data?.data?._id}`);
    //   setChatList((prev)=>[res?.data?.data,...prev]);
      
    //    return toast.success(res?.data?.response);
    // }

    // else{
    //   return toast.error(res?.data?.message);
    // }

    // } catch (error) {
    //    console.error("formSubmitFn",error instanceof Error ? error.message : error);
    //    return toast.error("Technical issue occured. Please refresh the page and try again later.");

    // }
    // finally{
    // formData.reset();
    // }

    






    



  }









  return (
    <div
    id='DashboardPage'
    className=' h-full flex flex-col items-center '
    >
      <div
      id="texts"
      className="flex-1   justify-center flex flex-col
       items-center w-full  sm:w-[70%] md:w-[50%] gap-[50px]">

        <div
        id="logo"
        className="flex items-center gap-[20px]  opacity-20">
          <img src="/logo.png"
           alt="app-logo"
            className="max-w-[64px] w-full h-[64px] pointer-events-none" />
          <h1 className='homePageH1 text-[64px] font-semibold'>CORTEX AI</h1>
        </div>



        {/*CHAT + IMAGE + CODE CONTAINER START */}

        <div
        id="options"
        className=" w-full max-w-full flex items-center justify-between  gap-[25px] sm:gap-[50px]  ">

          {/* NEW CHAT */}
          <div
          id="option"
         className="flex flex-col items-center flex-1 cursor-pointer hover:-translate-y-1
           transition-all duration-200 ease-in
          p-[20px] rounded-lg border border-[1px]
           border-[#555]
           hover:border-zinc-400
           font-light text-[14px] text-left "
          
          >
            <img src="/chat.png"
             alt='chat img'
             className='pointer-events-none w-[40px] h-[40px] object-cover'
             />
             <span>Create A New Chat</span>

          </div>


          {/* ANALYZE IMAGES */}
          <div
          id="option"
           className="flex flex-col items-center flex-1 cursor-pointer hover:-translate-y-1
           transition-all duration-200 ease-in
          p-[20px] rounded-lg border border-[1px]
           border-[#555]
           hover:border-zinc-400
           font-light text-[14px] text-left "
          
          >
            <img src="/image.png"
             alt='chat-img'
             className='pointer-events-none w-[40px] h-[40px] object-cover'
             />
             <span>Analayze Images</span>
          </div>
          {/* HELP ME WITH CODE */}
          <div
          id="option"
          className="flex flex-col items-center flex-1 cursor-pointer hover:-translate-y-1
           transition-all duration-200 ease-in
          p-[20px] rounded-lg border border-[1px]
           border-[#555]
           hover:border-zinc-400
           font-light text-[14px] text-left "
          
          
          >
            <img src="/code.png"
             alt='code-img'
           className='pointer-events-none w-[40px] h-[40px] object-cover'
             />
             <span>Help me with my code</span>
          </div>

        </div>

{/*CHAT + IMAGE + CODE CONTAINER START */}


      </div>


 {/* FORM + SUBMIT BUTTON START */}

  <div
  id="formContainer"
  className="mt-auto w-[95%] sm:w-[70%]  md:w-[50%] bg-[#2c2937] rounded-[20px] flex !mb-[10px]">


    <form
    onSubmit={formSubmitFn}
    className='w-full h-full flex items-center justify-between gap-[20px] '
    
    >

<input
 type="text"
 name="text"
 placeholder='Ask me anything'
 className='flex-1 p-[15px]
  bg-transparent
   focus:outline-none outline-none text-[#ececec]'
 />

 <button className='
 bg-[#605e68] hover:bg-slate-50 duration-300 ease-in-out
  rounded-full border-none cursor-pointer
   p-[10px] mr-[10px]  '>
  <img 
  src="/arrow.png"
  alt='arrow-img' 
  className='w-[16px] h-[16px] pointer-events-none' 
  />
 </button>

  </form>



  </div>

 {/* FORM + SUBMIT BUTTON END */}
    </div>
  )
}

export default DashboardPage