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
  const discussionState = useSelector((state) => state.discussions);
  const [ topicDiscussions, setTopicDiscussions ] = useState([]);
 
  useEffect(() => {
    if (!discussionState.retrieved.includes(topic_url)) {
      dispatch(setCurrentTopic(topic_url))
      handle(retrieveTopicDiscussions(topic_url), {});
      return;
    } 
    
    console.log(discussionState.list)
    // TODO yuse url or id?
    for (const [url, list] of Object.entries(discussionState.list)) {
      if (url ===  topic_url) {
        setTopicDiscussions(list);
      }
    }
  // eslint-disable-next-line
  }, [ discussionState, topic_url ]);


  let result;
  if (!topicDiscussions.length) {
    result = <p>no discussions :(</p>
  } else {
    result = <DiscussionCard discussions={ topicDiscussions } topic_url={ topic_url } /> 
  }
  
  return (
    <div>
      <h1>List discuss</h1>
      { error && <h1>{ error }</h1>}
      { isLoading ? (
        <p>loading...</p>
      ) : (
        <div>{ result }</div>
      )}
    </div>
  );
};

const DiscussionCard = ({ discussions, topic_url }) => {
  return (
    discussions.map((discussion, index) => (
      <Link to={`/topics/${topic_url}/discussions/${discussion.url}`} key={index}>
        <h3>{discussion.title}</h3>
      </Link>
    ))
  );
};

export default DiscussionList;
