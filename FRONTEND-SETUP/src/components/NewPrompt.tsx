import React, { useEffect, useRef, useState } from 'react'
import Upload from './Upload';
import { IKImage } from 'imagekitio-react';
import toast from 'react-hot-toast';
import axiosInstance from '../config/axiosInstance';
import { ai, geminiModel } from '../config/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatHistoryItem, ChatInterface } from '../types/app.type';



interface NewPromptInterface{
  dbData:ChatInterface[];
}
const NewPrompt:React.FC<NewPromptInterface> = ({dbData}) => {


  const [question,setQuestion] = useState<string>("");
   const [quesMedia,setQuesMedia] = useState<{
          data?:string | null ,
         mimeType?:string | null,
   } | null >(null);

   const [answer,setAnswer] = useState<string>("");

   
   const queryClient = useQueryClient();

  const [img,setImg] = useState<{
    isLoading:boolean;
    error:string;
    dbData:any;
    aiData:{
             inlineData:{
               data?:string | null ,
               mimeType?:string | null,
             }
      //          aiData:{
      //   inlineData:{
      //     data:base64,
      //     mimeType:file.type,
      //   }
      // } 
    }
  }>({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{  // contains the base64 of the image , on inlineData
      inlineData:{}
    },
  })
  const endRef = useRef<HTMLDivElement | null>(null);


  useEffect(()=>{
  endRef.current?.scrollIntoView({
    behavior:"smooth"
  })
  },[dbData, answer,question,img.dbData]);





  const handleDeleteImage = async () => {
  try {
    // Show loading toast
    // Call your backend to delete from ImageKit
    setImg({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: {} } });
    const res = await axiosInstance.delete(`/api/media/imagekit/delete/${img.dbData.fileId}`);
    return; 
    // Clear the image from state
  } catch (error) {
     console.error("Error deleting image:", error);
    return toast.error("Image deletion failed");

  }
};


//--------------------------------- INTERACTING WITH DB START -------------------------------------------



//--------------------------------------------------- THIS FUNCTION BASICALLY TO SAVE ON TO THE DB START ---------------------------------------------------
const saveNewPromptToDBApi = async ({ques,ans,qMedia}:{ques?:string,ans?:string,qMedia?:{data?:string | null ,mimeType?:string | null } | null })=>{

  // alert(promptAnswer);

  // if(! promptAnswer || promptAnswer.trim()) {
  //   alert('no answer')
  // }

  
  
  const res = await axiosInstance.put(`/api/chats/${dbData[0]?._id}`,{
    question:dbData && dbData?.length && dbData[0]?.history && dbData[0]?.history?.length === 1  && dbData[0]?.history[0]?.role === "user" ? "" : ques,
    answer:ans,
    ...(qMedia && Object.keys(qMedia).length &&{
      media:{
        filePath:qMedia?.data ,
        fileType:qMedia?.mimeType,
      }
    })
    // ...(quesMedia &&{
    //   media:{
    //     filePath:quesMedia?.data,
    //     fileType:quesMedia?.mimeType,
    //   }
    // })
  });
  return res?.data?.data;

}
//--------------------------------------------------- THIS FUNCTION BASICALLY TO SAVE ON TO THE DB END ---------------------------------------------------





const createChatMutation = useMutation({
  mutationFn: saveNewPromptToDBApi,
  onSuccess: () => {
    
     queryClient.invalidateQueries({
       queryKey: ["chat-by-id",dbData[0]?._id], // this will fetch the new  data when new submisssion success, there for we dont need anser,question, mediaques there
     }).then(() => {
        setQuestion("");
        setAnswer("");
        setQuesMedia(null);

     });
  },
  onError:(error:any)=>{
    console.error("createChatMutation",error instanceof Error ? error.message : error);
    toast.error(error instanceof Error ? error.message : "Technical error occured please try again after sometimes." );
  }
});



//--------------------------------- INTERACTING WITH DB END -------------------------------------------






  const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  // model: "gemini-1.5-flash",
  //  model: "gemini-2.5-pro",  
  config:{
    systemInstruction:{
    parts: [
      {
        text: `You are Cortex AI, a helpful and professional assistant.

CRITICAL INSTRUCTIONS:
- NEVER mention Google, Gemini, or being trained by Google
- NEVER say "I am Gemini" or "I am a large language model"
- NEVER refer to yourself as anything other than "Cortex AI"
- When introducing yourself, ONLY say "I'm Cortex AI" or similar
- Answer questions directly and professionally as Cortex AI
- Do not explain your limitations unless specifically asked
- Focus on being helpful and concise

Your identity is Cortex AI. This is non-negotiable.`
      }
    ]
    }
  },
  history: [




    //-------⚠️⚠️ THE PROMPT IT EXPECT START ⚠️⚠️-------
    // {
    //   role: "user",
    //   parts: [{ text: "Hello" }],
    // },
    // {
    //   role: "model",
    //   parts: [{ text: "Hi! How can I help you today?" }],
    // },
    // {
    //   role: "user",
    //   parts: [
    //     {
    //       text: "hello, i have 2 bugs in my own house kind of?",
    //     },
    //   ],
    // },




    //-------⚠️⚠️ THE PROMPT IT EXPECT END ⚠️⚠️-------


     

  ...(dbData ? (
    dbData[0]?.history.map((item:ChatHistoryItem) => ({
       role:item?.role,
       parts:[
        {
          text:item?.parts[0]?.text,
          // { inlineData?: { data: string; mimeType: string } } inline data not compulsory
        }
       ]
    }))
  ) : []),





  ],
  // config: {
  //   safetySettings,
  // },
});


//--------------------------- ⚠️⚠️ API FOR GEMINI , IF RESULT THEN TO  DB FOR SAVING START ⚠️⚠️ ---------------------------
const newPromptSubmitFn = async (val:string,isIntial:boolean, med?:{filepath:string,mimeType:string})=>{
  

  //val here is the question 
  try {



     //⚠️⚠️ initial means if its a first question (like dashbord to /:id page time ) then  
     // dont set question becauese question already saved to db on the dashboard time and now
     //  we just routing to /:id ⚠️⚠️
    if(!isIntial){   // if not initial set question and media otherwise it avialable on the db
      setQuestion(val);
          setQuesMedia({
        data:img.dbData?.filePath,
        mimeType:img?.dbData?.fileType,
      });
    }
    //if image exist pass it (base64 + text), if not just text only 

//---------------------------- ⚠️ REMEMBER PREVIOUS HISTORY START -------------------------

let parts: (
  | { text: string }
  | { inlineData: { data: string; mimeType: string } }
)[];

if (
  img.aiData.inlineData?.data &&
  img.aiData.inlineData?.mimeType
) {
  parts = [
    {
      inlineData: {
        data: img.aiData.inlineData.data,
        mimeType: img.aiData.inlineData.mimeType,
      },
    },
    { text: val },
  ];
} else {
  parts = [{ text: val }];
}


//stream is used because other wise we have to wait for full result ,
//  loading time will be very high

setImg({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: {} } });

const result = await chat.sendMessageStream({
  message: parts,
});

let fullText = "";
for await (const chunk of result) {
   const text = chunk.text;
   if (text) {
    fullText += text;
    setAnswer(fullText);
  }
}


// createChatMutation.mutate()

await createChatMutation.mutateAsync({
  ques: val, 
  ans: fullText,
  qMedia: quesMedia || null,
});
//---------------------------- ⚠️ REMEMBER PREVIOUS HISTORY END -------------------------

//---------------------------- ⚠️ THIS PART DONT REMEMBER PREVIOUS  HISTORY START -------------------------
    //  const result = await geminiModel(
    //   Object.entries(img?.aiData)?.length > 0 ? 
    //   [img?.aiData, val] : val
    // );
    // setAnswer(result as string);
    //---------------------------- ⚠️ THIS PART DONT REMEMBER PREVIOUS  HISTORY START -------------------------
   
  }
   catch (error) {
    console.error("newPromptSubmitFn",error instanceof Error ? error.message : error);
     toast.error("Technical error occured please try again after sometimes.");
    // toast.error(error instanceof Error ? error.message : "Technical error occured please try again after sometimes." );
  }  
}
//--------------------------- ⚠️⚠️ API FOR GEMINI , IF RESULT THEN TO  DB FOR SAVING END ⚠️⚠️ ---------------------------





const formHandleSubmitFn = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const form = e.currentTarget;
  const prompt = (e.target as HTMLFormElement).text.value;
  if(!prompt) return

   newPromptSubmitFn(prompt,false);
   return  form.reset();
};





//--------------⚠️⚠️ USEEFFECT TO DEAL WITH INITIAL TIME, WHEN USER ON DASHBOARD SEND TEXT, IT WILL BE REOUTED TO /:ID SO WE NEED TO ANSWER FO THAT QUESTIO⚠️⚠️------------------

//to make sure it only run once , "IN PRODUCTION WE DONT NEED IT" 
const hasInitialRun = useRef<boolean>(false);

useEffect(()=>{
  if(!hasInitialRun?.current){
    if(dbData && dbData?.length && dbData[0]?.history && dbData[0]?.history?.length === 1  && dbData[0]?.history[0]?.role === "user" ) {
      newPromptSubmitFn(dbData[0]?.history[0]?.parts[0]?.text as string,true);
    }
  }
  hasInitialRun.current = true
},[]);
//--------------⚠️⚠️ USEEFFECT TO DEAL WITH INITIAL TIME, WHEN USER ON DASHBOARD SEND TEXT, IT WILL BE REOUTED TO /:ID SO WE NEED TO ANSWER FO THAT QUESTIO⚠️⚠️------------------



  return (
    
    <div
     className='newPrompt  '
     >

                {/* 
                <div className="bg-[#2c2937] rounded-[20px] 
                max-w-[80%] self-end p-[10px] sm:p-[15px] 
                 md:p-[17px] lg:p-[20px] ">text message 
                 from user</div>

          <div className=" p-[10px] sm:p-[15px]
            md:p-[17px] lg:p-[20px]
           self-start">text from ai</div>
            */}



            {/*QUESTION AND ANSWER  START */}
            <div>

      {/* Q-S */}

      {
        question && (

          <div className='flex flex-col  items-end gap-2'>

            {
              quesMedia && quesMedia?.mimeType && (
            ["image/jpeg","image/png", "image/webp", "image",].includes( quesMedia?.mimeType) && (
            <div
             className='relative  '
             >
                  <IKImage
                 urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                 path={quesMedia?.data as string}
                   transformation={[{ width: 400, height: 400, }]}
                 className="rounded-lg  object-cover"
               />
            </div>


                     )
              )
            }


{/* CHANGE THE COLOR  bg-[#2c2937]  CHANGE TO BG-RED-400 TO CHECK THE INVALIDATION OF EXISTING GETR REQUEST AND GETTING NEW ONE  */}
           <div className="bg-[#2c2937] rounded-[20px] 
                max-w-[80%] w-fit 
                
                 p-[10px] sm:p-[15px] 
                 md:p-[17px] lg:p-[20px] ">
                  {question}
                 </div>
          </div>


        )
      }
      {/* Q-E */}




      {
        answer && (
                 <div className="
             max-w-full w-fit mt-4
                 p-[10px] sm:p-[15px]
           self-start">
<div className="space-y-4 leading-relaxed text-justify">
  <Markdown>{answer}</Markdown>
</div>
           </div>
        )
      }





            </div>
            {/*QUESTION AND ANSWER  END */}

{/* 
      {
        img.dbData?.filePath && (
          <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          />
        )
      } */}




<div className="absolute bottom-2  left-1/2 -translate-x-1/2 z-50
         w-[90%] sm:w-[85%]  md:w-[75%] lg:w-[50%]
         bg-primary3 gap-[20px] p-[0px]
         rounded-[20px] border-[1px] border-[#605e68]/20
          hover:border-zinc-400
          transition-colors duration-300 ease-in-out P-4"
         >

         {/*IMGDATA START */}

         {
          img.isLoading ? (
          <div className="w-[100px] h-[100px] relative bg-gray-200 rounded-lg">
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
  </div>
</div>
          ):(

            img.dbData?.filePath && (
           <div className="  p-3">

            {
            ["image/jpeg","image/png", "image/webp", "image",].includes( img?.dbData?.fileType) && (
             <div className="relative inline-block">
               <IKImage
                 urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                 path={img.dbData?.filePath}
                 transformation={[{ width: 100, height: 100 }]}
                 className="rounded-lg  object-cover"
               />
               {/* Optional: Add close button to remove image */}
               <button
                 onClick={handleDeleteImage}
                 className="absolute -top-2 -right-2 bg-primary
                    text-white rounded-full 
                    w-6 h-6 flex items-center justify-center text-base cursor-pointer"
               >
                 ×
               </button>
             </div>
              )
            }

           </div>
         )
          )
         }



         
         {/*IMGDATA END */}




        <form
        onSubmit={formHandleSubmitFn} 
        id="newForm"
        className=' flex items-center '
        >

           {/* Image preview above the form */}





    {/*FILE UPLOAD START */}

    <Upload
    setImg={setImg}
    />

{/* FILE UPLOAD END */}


            <input
            type="text"
            autoComplete='off'
            name="text"
             placeholder='Ask anything'
              className='flex-1 p-[15px]
  bg-transparent
   focus:outline-none outline-none text-[#ececec]'
             />

             <button 
             type='submit'
             className='bg-[#605e68] hover:bg-[#ececec] transition-colors duration-200 ease-in-out rounded-full border-none cursor-pointer p-[10px] mr-[10px] shrink-0 '
             >
  <img 
  src="/arrow.png"
  alt='arrow-img' 
  className='w-[16px] h-[16px] pointer-events-none' 
  />
 </button>
 
        </form>
</div>


            <div
      ref={endRef}
      id="endChat" className="pb-[100px] "></div>
     
     </div>
  )
}

export default NewPrompt








{/*FILE UPLOAD START */}



           {/* <label
            //  htmlFor="file"
             className='bg-[#605e68] rounded-full
              border-none cursor-pointer p-[10px] ml-[10px]
               hover:bg-[#ececec] transition-colors duration-200 
               ease-in-out'
            >
                <img src="/attachment.png"
                 alt="file-selector"
                  className='w-[16px] h-[16px] pointer-events-none' 
                />
              </label> */}

            {/* <label
             htmlFor="file"
             className='bg-[#605e68] rounded-full border-none cursor-pointer p-[10px] ml-[10px] hover:bg-[#ececec] transition-colors duration-200 ease-in-out'
            
            >
                <img src="/attachment.png"
                 alt="file-selector"
                  className='w-[16px] h-[16px] pointer-events-none' 
                />
            </label> */}
            {/* <input id="file" type="file"  multiple={false} hidden /> */}

{/* FILE UPLOAD END */}
