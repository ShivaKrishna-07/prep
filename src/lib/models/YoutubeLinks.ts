// models/YoutubeLink.ts

import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  link: String,
  channel: String,
});

const youtubeLinksSchema = new mongoose.Schema({
  year: { type: String, required: true, unique: true },
  subjects: {
    type: Map,
    of: subjectSchema,
    required: true,
  },
});

export default mongoose.models.YoutubeLink ||
  mongoose.model("YoutubeLink", youtubeLinksSchema);
