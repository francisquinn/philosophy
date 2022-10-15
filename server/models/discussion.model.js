const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discussionSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    topic_id: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = Discussion;
