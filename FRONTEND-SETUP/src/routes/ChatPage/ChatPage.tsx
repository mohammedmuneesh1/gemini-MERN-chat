import NewPrompt from '../../components/NewPrompt';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ChatHistoryItem, ChatInterface } from '../../types/app.type';
import { IKImage } from 'imagekitio-react';
import Markdown from 'react-markdown';

const ChatPage = () => {

  const params = useParams();
  const chatId = params.id;


  
  const fetchChatByIdApi = async () => {
  const res = await axiosInstance.get(`/api/chats/${chatId}`);
  if (!res.data.success) {
    throw new Error(res.data.response);
  }
  return res.data.data ?? [];
};


  const {
  data,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["chat-by-id",chatId],
  queryFn:fetchChatByIdApi,
});


console.log('res data',data)



// const triggerFn = ()=>{

//   if(data && data?.history){
//     console.log('value exist');
//     return false;
//   }
//   return false

//           // {
//           //  data && data?.history && (
//           //    data?.map((val:ChatHistoryItem)=>{



//           //    }
//           //   )

//           //  )
           


//           // }
// }




if(isLoading){
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}


  return (

    <div 
    id="chatPage"
    className=' relative h-full  flex flex-col items-center layoutPaddingTop custom-scrollbar'
    >

      <div id="wrapper"
      //  className="flex-1  max-w-full w-full flex justify-center overflow-y-auto"
         className="flex-1 w-full flex justify-center overflow-y-auto overscroll-contain scrollbar-hid"
       >
        <div id="chat"
         className="w-[95%] sm:w-[90%]  flex flex-col
           text-sm sm:text-base"
        //  className="w-[50%] bg-blue-500 flex flex-col "
        >


          {
           data && data?.length > 0 && (
             data?.map((item:ChatInterface)=>(
              item?.history && item?.history?.length > 0 && (
                item?.history?.map((val:ChatHistoryItem,index:number)=>
                          {


              if(val?.role === "user"){
                return(


          <div
          key={`${val?.role}-${index}`}
          className='flex flex-col  items-end gap-2'>

            {val?.parts[0]?.inlineData && val?.parts[0]?.inlineData?.data && (
            ["image/jpeg","image/png", "image/webp", "image",].includes( val?.parts[0]?.inlineData?.mimeType) && (
            <div
             className='relative  '
             >
                  <IKImage
                 urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                 path={ val?.parts[0]?.inlineData?.data}
                   transformation={[{ width: 400, height: 400, }]}
                   loading='lazy'
                 className="rounded-lg  object-cover"
               />
            </div>

              ))
            }

                       <div className="bg-[#2c2937] rounded-[20px] 
                max-w-[80%] w-fit 
                 
                 p-[10px] sm:p-[15px] 
                 md:p-[17px] lg:p-[20px] ">
                  {val?.parts[0]?.text}
                 </div>
          </div>
                
                )
              }

              else{

                return (
            <div
          key={`${val?.role}-${index}`}
           className="p-[10px] sm:p-[15px]  md:p-[17px] lg:p-[20px]
            self-start leading-10"
           >
            <Markdown >
            {
              val?.parts[0]?.text ?? ""
            }
            </Markdown>
           </div>
                )

              }
             }
            ))

              
              
             )

            )

           )
           


          }



      


          {/*CHAT-INPUT START */}
           


           {/* JUST MAKE SURING THERE IS "data" to prevent the newPrompt component getting crash */}
          {
            data && (
              <NewPrompt
              dbData={data}
              />
            )
          }

          {/* <div id="scroll-to-view" /> */}
          {/*CHAT-INPUT END */}


        </div> 
      </div>

    </div>
  )
}

export default ChatPage