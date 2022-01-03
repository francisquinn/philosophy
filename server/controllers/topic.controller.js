const Topic = require("../models/topic.model");
const Discussion = require("../models/discussion.model");

const getAllTopics = (req, res) => {
  Topic.find()
    .then((r) => res.send(r))
    .catch((e) => console.log(e));
};

const getTopicByUrl = (req, res) => {
  let url = req.params;
  Topic.findOne(url)
    .then((r) => res.send(r))
    .catch((err) => console.log(err));
};

const getTopicDiscussions = (req, res) => {
  let url = req.params;
  Topic.findOne(url)
    .then((response) => {
      const topic_id = response._id;
      Discussion.find({ topic_id: topic_id })
        .then((discussions) => res.send(discussions))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const getDiscussionById = (req, res) => {
  let discussion_id = req.params.discussion_id;
  Discussion.findById(discussion_id)
    .then((discussion) => res.send(discussion))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllTopics,
  getTopicByUrl,
  getTopicDiscussions,
  getDiscussionById,
};
