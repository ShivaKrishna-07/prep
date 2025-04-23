// lib/models/Chat.ts
import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IChat extends Document {
  userId: string;
  messages: IMessage[];
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
}, { _id: false });

const ChatSchema = new Schema<IChat>({
  userId: { type: String, required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});


export const Chat = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);