import type { Request, Response } from "express";
import ResponseHandler from "../../../utils/responseHandler.js";
import ChatModel from "../models/chat.schema.js";
import mongoose from "mongoose";
import type { AuthenticatedRequest } from "../../../config/isAuth.js";
import { isValidObjectId } from "mongoose";



export async function CREATE_NEW_CHAT_CONTROLLER(req:AuthenticatedRequest,res:Response){
    

    const userId = req?.user?.id;
    if(!userId) return ResponseHandler(res,200,false,null,"User Not Found");
    const {text} = req.body;
    

  //create new chat 

    const newChat = new ChatModel({
        userId: userId as string,
        title: text.substring(0, 40),
        history:[{
            role:"user",
            parts:[{
                text:text,
            }]            
        }],
    });
    const savedChat = await newChat.save();

    
    return ResponseHandler(res,200,true,{
        _id:savedChat._id,
        title:savedChat.title,
        createdAt:savedChat.createdAt
    },"Chat Created Successfully");
}




export async function GET_USER_CHAT_HISTORY_CONTROLLER(req:AuthenticatedRequest,res:Response){
    const userId = req?.user?.id;
    if(!userId) return ResponseHandler(res,200,false,null,"User Not Found");
    const  userChat = await ChatModel.find({
        //@ts-ignore
        userId:userId as string,
    }).select("userId title createdAt").sort({createdAt:-1});
    return ResponseHandler(res,200,true,userChat,"Chat History Fetched Successfully");
}



export async function GET_USER_CHAT_HISTORY_BY_ID_CONTROLLER(req:AuthenticatedRequest,res:Response){
    const userId = req?.user?.id;
    const id = req.params.id;
    if(!id || !isValidObjectId(id)){
        return ResponseHandler(res,200,false,null,"Invalid Chat Id");
    }

    if(!userId){
         return ResponseHandler(res,200,false,null,"User Not Found");
}
    const  userChat = await ChatModel.find({
        //@ts-ignore
        userId:userId as string,
        _id:id as string,
    })
    return ResponseHandler(res,200,true,userChat,"Chat History Fetched Successfully");
}




export async function EDIT_EXISTING_CHAT_CONTROLLER(req:AuthenticatedRequest,res:Response){

    const {id} = req.params;
    const  {question,answer,media}  = req.body;


    console.log('body',req.body);

    const historyUpdates: any[] = [];

if (question && question.trim()) {
  historyUpdates.push({
    role: "user",
    parts: [
      {
        text: question.trim(),
        ...(media && Object.keys(media).length
          ? {
              inlineData: {
                data: media.filePath,
                mimeType: media.fileType,
              },
            }
          : {}),
      },
    ],
  });
}

if(!answer || !answer.trim()){
    return ResponseHandler(res,200,true,null,"no answer found");
}

if (answer && answer.trim()) {
  historyUpdates.push({
    role: "model",
    parts: [
      {
        text: answer.trim(),
      },
    ],
  });
}





const updateChat = await ChatModel.findOneAndUpdate(
    { 
      // @ts-ignore 
    _id: id },

  {
    $push: {
      history: {
        $each: [
         // ⚠️⚠️ IN INTIAL PHASE, WHEN WE ROUTE FROM DASHBOARD TO /:ID , THE QUESION ALREADY SAVED, THEREFORE /:ID WILL INITLLAY DONT PROVIDE QUESTION, SO DUPLICATION CAN BE AVOIDED
         //PURPOSE: AVOID DUPLICATION OF QUESTION OR EMPTY QUESTION CRATION (DASHBOARD TO /:ID TIME  IF IINITAL PHASE WE GENERATE ANSWER, THERE FORE TO PREVENT EMPTY QUESION CREATION)
         ...historyUpdates,
        ],
      },
    },
  },
  { new: true }
);

if(!updateChat){
    return ResponseHandler(res,200,false,null,"Chat Not Found");
}
   return ResponseHandler(res,200,true,updateChat,"Chat Updated Successfully");
}