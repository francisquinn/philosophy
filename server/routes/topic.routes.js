const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/", topicController.getAllTopics);
router.get("/:url", topicController.getTopicByUrl);
router.get("/:url/discussions", topicController.getTopicDiscussions);
router.get("/:url/discussions/:discussion_id", topicController.getDiscussionById);

module.exports = router;
