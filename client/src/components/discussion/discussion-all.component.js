import { Link } from "react-router-dom";
import { retrieveTopicDiscussions } from "../../slices/discussion.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DiscussionList = () => {
  const { topic_url } = useParams();
  const state = useSelector((state) => state.discussions);
  const discussions = state.discussions;
  const dispatch = useDispatch();
  useEffect(() => {
    if (discussions.length === 0) {
      dispatch(retrieveTopicDiscussions(topic_url));
    }
  }, [dispatch, discussions, topic_url]);
  return (
    <div>
      <h1>List discuss</h1>
      {discussions &&
        discussions.map((discussion, index) => (
          <Link to={`/topics/${topic_url}/discussions/${discussion._id}`} key={index}>
            <h3>{discussion.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default DiscussionList;
