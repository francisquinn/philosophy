const Topic = require("../models/topic.model");
const Discussion = require("../models/discussion.model");
const User = require('../models/user.model');
const mongoose = require('mongoose');

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

const createTopicDiscussion = (req, res) => {
  let topic_url = {url:'test'};
  User.findById(res.locals.user)
  .then((user) => {
    Topic.findOne(topic_url)
    .then((response) => {
      const topic_id = response._id;
      Discussion.create({
        topic_id: topic_id,
        user_id: mongoose.Types.ObjectId(res.locals.user),
        title: req.body.title,
        description: req.body.description,
        author: user.username,
        topic_url: topic_url.url
      });
    })
    .catch((err) => console.log(err));
  })
};

const updateTopicDiscussion = (req, res) => {
  Discussion.findByIdAndUpdate(req.body.discussion_id, {
    title: req.body.title,
    description: req.body.description,
  })
  .then(() => console.log("discussion edited success"))
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
  createTopicDiscussion,
  updateTopicDiscussion,
  getDiscussionById,
};
