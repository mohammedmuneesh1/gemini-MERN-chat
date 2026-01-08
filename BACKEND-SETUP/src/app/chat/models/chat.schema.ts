import mongoose from "mongoose";


interface IPartSchema {
    type:string,
    inlineData:{
        data?:string,
        mimeType?:string
    };
};

interface IhistorySchema{
    role:string;
    parts:IPartSchema[];

}



const partSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: false,
    },
    inlineData: {
      data: {
        type: String,
        required: false,
      },
      mimeType: {
        type: String,
        required: false,
      },
    },
  },
  { _id: false }
);

const historySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    parts: {
      type: [partSchema],
      required: true,
    },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: "New Chat",
    },
    history: {
      type: [historySchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Add compound index for efficient queries
chatSchema.index({ userId: 1, createdAt: -1 });

const ChatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default ChatModel;