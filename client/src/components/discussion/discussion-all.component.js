import { Link } from "react-router-dom";
import { 
  retrieveTopicDiscussions, 
  setCurrentTopic
} from "../../slices/discussion.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const DiscussionList = () => {
  const { topic_url } = useParams();
  const { handle, isLoading, error } = useDispatchHandler();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const discussions = state.discussions.list;
  const retrieved = state.discussions.retrieved;

  const [tds, setTds] = useState([]);
  console.log(retrieved)
  console.log(topic_url)
  useEffect(() => {
    if (!retrieved.includes(topic_url)) {
      dispatch(setCurrentTopic(topic_url));
      handle(retrieveTopicDiscussions(topic_url), {});
      return;
    } 
    
    for (const d of discussions) {
      if (Object.keys(d).includes(topic_url)) {
        setTds(Object.values(d)[0])
      } 
    }

  // eslint-disable-next-line
  }, [discussions, topic_url]);

  let discussionResults;
  if (!tds.length) {
    discussionResults = <p>empty</p>
  } else {
    discussionResults = tds.map((discussion, index) => (
          <Link to={`/topics/${topic_url}/discussions/${discussion.url}`} key={index}>
          <h3>{discussion.title}</h3>
        </Link>
      ))  
  }
  
  return (
    <div>
      <h1>List discuss</h1>
      { error && <h1>{ error }</h1>}
      { isLoading ? (
        <p>loading...</p>
      ) : (
        <div>{ discussionResults }</div>
      )}
    </div>
  );
};

export default DiscussionList;
