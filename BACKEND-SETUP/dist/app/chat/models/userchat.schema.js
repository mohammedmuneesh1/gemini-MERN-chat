import mongoose, { Model, Types } from "mongoose";
const userChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chats: [
        {
            _id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        },
    ]
}, { timestamps: true });
const UserChatModel = mongoose.models.UserChat || mongoose.model("UserChat", userChatSchema);
// const UserChatModel =mongoose.models.UserChat || mongoose.model("UserChat", userChatSchema);
export default UserChatModel;
//# sourceMappingURL=userchat.schema.js.map