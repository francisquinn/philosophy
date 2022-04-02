import { Link } from "react-router-dom";
import { 
  retrieveTopicDiscussions, 
  setCurrentTopic 
} from "../../slices/discussion.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DiscussionList = () => {
  const { topic_url } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.discussions);
  const discussions = state.list;
  const topic = state.topic;

  useEffect(() => {
    // store current topic discussion, refresh when topic changed
    if (topic_url !== topic) {
      dispatch(setCurrentTopic(topic_url));
      dispatch(retrieveTopicDiscussions(topic_url));
    }
  }, [dispatch, discussions, topic_url, topic]);
  
  return (
    <div>
      <h1>List discuss</h1>
      {discussions &&
        discussions.map((discussion, index) => (
          <Link to={`/topics/${topic_url}/discussions/${discussion.url}`} key={index}>
            <h3>{discussion.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default DiscussionList;
