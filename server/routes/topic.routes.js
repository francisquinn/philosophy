const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");
const authController = require("../controllers/auth.controller");

router.get("/", topicController.getAllTopics);
router.get("/:url", topicController.getTopicByUrl);
router.post("/discussion/create", authController.authenticateToken, topicController.createTopicDiscussion);
router.put("/discussion/update", authController.authenticateToken, topicController.updateTopicDiscussion);
router.get("/:url/discussions", topicController.getTopicDiscussions);
router.get("/:url/discussions/:discussion_id", topicController.getDiscussionById);

module.exports = router;
