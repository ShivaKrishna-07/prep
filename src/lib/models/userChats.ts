// lib/models/UserChats.ts
import mongoose, { Schema, Document } from "mongoose";

interface IChatSummary {
  _id: mongoose.Types.ObjectId;
  title: string;
}

interface IUserChats extends Document {
  userId: string;
  chats: IChatSummary[];
}

const UserChatsSchema = new Schema<IUserChats>({
  userId: { type: String, required: true, unique: true },
  chats: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      title: { type: String, required: true },
    },
  ],
});

export const UserChats =
  mongoose.models.UserChats ||
  mongoose.model<IUserChats>("UserChats", UserChatsSchema);
