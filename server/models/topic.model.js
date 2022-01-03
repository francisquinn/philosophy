const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const Discussions = new Schema({
//   id: {
//     type: ObjectId,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
