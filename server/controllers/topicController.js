const Topic = require("../models/topic");

const topic_index = (req, res) => {
  Topic.find()
    .then((r) => res.send(r))
    .catch((e) => console.log(e));
};

module.exports = {
  topic_index,
};
