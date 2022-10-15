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
      return res.status(200).send({ error: 'topic does not exist' });
    }
    if (err) {
      return handleError(err);
    }
    res.status(200).send(topic);
  });
};

const getTopicDiscussions = (req, res) => {
  let topic_url = req.params.url;
  Topic.aggregate([{ $match: { url: topic_url }}, { $lookup: {
    from: "discussions",
    localField: "_id",
    foreignField: "topic_id",
    as: "discussions"
  }}], (err, topic) => {
   if (err) {
      return handleError(err);
    }
    return res.status(200).send({ 
      topic_id: topic[0]._id, 
      topic_url: topic[0].url,
      discussions: topic[0].discussions 
    });
  });
};

const createTopicDiscussion = (req, res) => {
  const title = req.body.title;
  // TODO validate text fields
  if (title.length < 1) {
    res.status(200).send({ error: 'Discussion not' });
    return;
  }
  const url = generateDiscussionUrl(title);
  
  const topic_id = req.body.topic_id;
  const user = res.locals.user;

    Discussion.create({
      user_id: mongoose.Types.ObjectId(user.id),
      topic_id: mongoose.Types.ObjectId(topic_id),
      title: req.body.title,
      description: req.body.description,
      author: user.username,
      url: url
    }, (err, discussion) => {
      if (err) {
        return handleError(err);
      }

      return res.status(200).send({ message: 'Discussion created', discussion: discussion });
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

const handleError = (error) => {
  console.log(error);
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
