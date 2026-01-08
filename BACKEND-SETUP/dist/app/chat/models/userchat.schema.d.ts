import mongoose, { Types } from "mongoose";
interface IUserChat {
    userId: Types.ObjectId;
    chats: {
        _id: string;
        title: string;
        createdAt: Date;
    }[];
}
declare const UserChatModel: mongoose.Model<IUserChat, {}, {}, {}, mongoose.Document<unknown, {}, IUserChat, {}, mongoose.DefaultSchemaOptions> & IUserChat & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, IUserChat>;
export default UserChatModel;
//# sourceMappingURL=userchat.schema.d.ts.map