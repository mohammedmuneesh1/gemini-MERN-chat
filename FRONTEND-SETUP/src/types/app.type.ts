      export interface  ChatListInterface {
            _id:string,
            userId: string,
            title: string;
        }





        // CHAT ITEM START 


export interface ChatHistoryPart {
  text: string;
      inlineData: {
      data:string,
      mimeType: string,
    },
}

export interface ChatHistoryItem {
  role: "user" | "assistant" | "system";
  parts: ChatHistoryPart[];
}

export interface ChatInterface {
  _id: string;
  userId: string;
  title: string;
  history: ChatHistoryItem[];
  createdAt: string; // ISO string from Mongo
  updatedAt: string; // ISO string from Mongo
  __v: number;
}


