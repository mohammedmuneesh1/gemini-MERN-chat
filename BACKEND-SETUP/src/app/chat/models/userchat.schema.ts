
import mongoose, { Model, Types, type Models } from "mongoose";

interface IUserChat {
  userId: Types.ObjectId;
  chats: {
    _id: string;
    title: string;
    createdAt: Date;
  }[];
}

const userChatSchema = new mongoose.Schema<IUserChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chats:[
        {
            _id:{
                type:String,
                required:true
            },
            title:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now,
            }
        },
    ]
  },
  { timestamps: true }
);




const UserChatModel = (mongoose.models.UserChat as Model<IUserChat>)  || mongoose.model<IUserChat>("UserChat", userChatSchema);

// const UserChatModel =mongoose.models.UserChat || mongoose.model("UserChat", userChatSchema);

export default UserChatModel;