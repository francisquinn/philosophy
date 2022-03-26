const Topic = require("../models/topic.model");
const Discussion = require("../models/discussion.model");
const User = require('../models/user.model');
const mongoose = require('mongoose');

const getAllTopics = (req, res) => {
  Topic.find()
    .then((response) => res.status(200).send(response))
    .catch((err) => console.log(err));
};

const getTopicByUrl = (req, res) => {
  let url = req.params;
  Topic.findOne(url)
    .then((response) => res.status(200).send(response))
    .catch((err) => console.log(err));
};

const getTopicDiscussions = (req, res) => {
  let url = req.params;
  Topic.findOne(url)
    .then((response) => {
      const topic_id = response._id;
      Discussion.find({ topic_id: topic_id })
        .then((discussions) => res.status(200).send(discussions))
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};

const createTopicDiscussion = (req, res) => {
  // TODO validate text fields
  if (req.body.title.length < 1) {
    res.status(400).send({ status: 400, message: 'Discussion not' });
    return;
  }
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
      })
      .then((discussion) => {
        res.status(200).send({ status: 200, message: 'Discussion created', discussion: discussion });
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
  .then(() => {
    Discussion.findById(req.body.discussion_id)
      .then((discussion) =>  res.status(200).send({ status: 200, message: 'Discussion updated', discussion: discussion }))
  })
  .catch((err) => console.log(err));
};

const deleteTopicDiscussion = (req, res) => {
  Discussion.findByIdAndDelete(req.body.discussion_id)
    .then(() => res.status(200).send({ status: 200, message: 'Discussion deleted' }))
    .catch((err) => console.log(err));
};

const getDiscussionById = (req, res) => {
  let discussion_id = req.params.discussion_id;
  Discussion.findById(discussion_id)
    .then((discussion) => res.status(200).send(discussion))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllTopics,
  getTopicByUrl,
  getTopicDiscussions,
  createTopicDiscussion,
  updateTopicDiscussion,
  deleteTopicDiscussion,
  getDiscussionById,
};
