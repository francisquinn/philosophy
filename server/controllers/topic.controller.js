const Topic = require("../models/topic.model");
const Discussion = require("../models/discussion.model");
const User = require('../models/user.model');
const mongoose = require('mongoose');

const getAllTopics = (req, res) => {
  Topic.find({}, (err, topics) => {
    if (err) {
      return handleError(err);
    }
    return res.status(200).send(topics);
  });
};

const getTopicByUrl = (req, res) => {
  let url = req.params;
  Topic.findOne(url, (err, topic) => {
    if (topic == null) {
      return res.status(400).send({ message: 'topic does not exist' });
    }
    if (err) {
      return handleError(err);
    }
    res.status(200).send(topic);
  });
};

const getTopicDiscussions = (req, res) => {
  let url = req.params;
  Topic.findOne(url, (err, topic) => {
    if (err) {
      return handleError(err);
    }
    const topic_id = topic._id;
    Discussion.find({ topic_id: topic_id }, (err, discussions) => {
      if (err) {
        return handleError(err);
      }
      return res.status(200).send(discussions);
    });
  });
};

const createTopicDiscussion = (req, res) => {
  const title = req.body.title;
  // TODO validate text fields
  if (title.length < 1) {
    res.status(400).send({ status: 400, message: 'Discussion not' });
    return;
  }
  const url = generateDiscussionUrl(title);
  let topic_url = {url:'test'};
  User.findById(res.locals.user, (err, user) => {
    if (err) {
      return handleError(err);
    }
    Topic.findOne(topic_url, (err, topic) => {
      if (err) {
        return handleError(err);
      }
      const topic_id = topic._id;
      Discussion.create({
          topic_id: topic_id,
          user_id: mongoose.Types.ObjectId(res.locals.user),
          title: req.body.title,
          description: req.body.description,
          author: user.username,
          url: url,
          topic_url: topic_url.url
      }, (err, discussion) => {
        if (err) {
          return handleError(err);
        }
        return res.status(200).send({ message: 'Discussion created', discussion: discussion })
      });
    });
  });
};

const updateTopicDiscussion = (req, res) => {
  const url = generateDiscussionUrl(req.body.title);
  Discussion.findByIdAndUpdate(req.body.discussion_id, {
      title: req.body.title,
      description: req.body.description,
      url: url
    }, (err) => {
      if (err) {
        return handleError(err);
      }
      Discussion.findById(req.body.discussion_id, (err, discussion) => {
        if (err) {
          return handleError(err);
        }
        return res.status(200).send({ message: 'Discussion updated', discussion: discussion });
      });
    });
};

const deleteTopicDiscussion = (req, res) => {
  Discussion.findByIdAndDelete(req.body.discussion_id, (err) => {
    if (err) return handleError(err);
    return res.status(200).send({ message: 'Discussion deleted' });
  });
};

const getDiscussionByUrl = (req, res) => {
  const discussion_url = req.params.discussion_url;
  Discussion.findOne({ url: discussion_url }, (err, discussion) => {
    if (err) return handleError(err);
    return res.status(200).send(discussion);
  });
};

const generateDiscussionUrl = (title) => {
  return title.trim().replace(/\s+/g, '-').toLowerCase();
};

module.exports = {
  getAllTopics,
  getTopicByUrl,
  getTopicDiscussions,
  createTopicDiscussion,
  updateTopicDiscussion,
  deleteTopicDiscussion,
  getDiscussionByUrl,
};
