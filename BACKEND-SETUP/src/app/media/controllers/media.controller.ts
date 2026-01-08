import type { Request, Response } from "express";
import ResponseHandler from "../../../utils/responseHandler.js";
import imageKitIOClient from "../../../config/imagekitIO.js";



export async function MEDIA_IMAGEKIT_UPLOAD_CONTROLLER(req:Request,res:Response){

  const result= imageKitIOClient.getAuthenticationParameters();


//    {
//         "token": "78912edb-0682-4848-89e8-fb2a37f3dd56",
//         "expire": 1767540121,
//         "signature": "221c7e6a35e3e41c038e98ce394eec0da60b41d7"
//     },






    return ResponseHandler(res,200,true,result,"Image Uploaded Successfully");
}



export async function MEDIA_IMAGEKIT_DELETE_BY_FILE_ID_CONTROLLER(req:Request,res:Response){

  console.log('file trigered');
  const {fileId} = req.params;
  if(!fileId) return ResponseHandler(res,200,false,null,"Please provide a File Id");
  await imageKitIOClient.deleteFile(fileId);

  return ResponseHandler(res,200,true,null,"Image Deleted Successfully");
}
