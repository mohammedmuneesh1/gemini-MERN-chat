import React from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";
import { IKContext, IKUpload } from "imagekitio-react";



interface UploadInterface{
  setImg:React.Dispatch<React.SetStateAction<{isLoading: boolean; error: string; dbData: any; aiData: any }>>;


}
const Upload:React.FC<UploadInterface> = ({setImg}) => {

  const urlEndPoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;



  const authenticator = async ()=>{
    try {
    // console.log('🟢 BEFORE AXIOS REQUEST');
        const res = await axiosInstance.get(`/api/media/upload`);
 

    
        if(!res?.data?.success){
              throw new Error("ImageKit auth failed");
        }
        else{
          const {signature,expire,token} = res?.data?.data;
          return {signature,expire,token};
        }
    } catch (error) {
      console.error('failed to authenticator',error);
      throw new Error("ImageKit auth failed");
    }


  }



  const onSuccess = (res:any)=>{
    console.log('Success',res);
    setImg(prev=>({
      ...prev,
      isLoading:false,
      dbData:res
    }));
    
  }
  
  const onError = (err:any)=>{
     toast.error("Image upload failed");
    console.log('onError',err);
  }

  const onUploadProgress = (progress:any)=>{
    
    console.log('onUploadProgress',progress);
  }

  const onUploadStart = (evt:any)=>{
    const file = evt.target.files[0];


    console.log('file',file);

    const reader = new FileReader();
    //FileReader is a standard web API 
    // (part of the Web APIs, not exclusive to React). Its purpose is to allow web applications to asynchronously read the contents of files (or raw data buffers) 
    // stored on the user's computer.

    reader.onloadend = ()=>{
        const result = reader.result;
        if (!result || typeof result !== "string") return;
       const [, base64] = result.split(",");




      setImg(prev=>({...prev,
         aiData:{
        inlineData:{
          data:base64,
          mimeType:file.type,
        }
      } 
    }));


    }

    reader.readAsDataURL(file);

    console.log('onUploadStart',evt);
    setImg(prev=>({...prev,isLoading:true}));
    
  }




  return(
  <div>

    <IKContext
    urlEndpoint={urlEndPoint}
    publicKey={publicKey}
    authenticator={authenticator}
    >



    <label
      htmlFor="imagekit-upload" // Connect to IKUpload
      className='bg-[#605e68] rounded-full border-none cursor-pointer p-[10px] ml-[10px] hover:bg-[#ececec] transition-colors duration-200 ease-in-out inline-flex items-center justify-center'
    >
      <img 
        src="/attachment.png"
        alt="file-selector"
        className='w-[16px] h-[16px] pointer-events-none' 
      />
    </label>

    {/* Remove the regular input, keep only IKUpload */}
    <IKUpload 
      id="imagekit-upload" // Match this with label's htmlFor
      fileName="test-upload.png"
      useUniqueFileName={true}
      onUploadProgress={onUploadProgress}
      onUploadStart={onUploadStart}
      onError={onError}
      onSuccess={onSuccess}
      style={{ display: "none" }}
    />


 {/*  <IKUpload /> - which is the actual ImageKit upload component */}
      {/*CLIENT SIDE UPLOAD GOES HERE */}

    </IKContext>

  </div>
  ) 
  ;
};

export default Upload;
