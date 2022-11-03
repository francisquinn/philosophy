import DiscussionCard from "../../components/discussion/discussion-card.component";
import { 
  retrieveTopicDiscussions, 
  setCurrentTopic
} from "../../slices/discussion.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const Discussions = () => {
  const { topic_url } = useParams();
  const { handle, isLoading, error } = useDispatchHandler();
  const dispatch = useDispatch();
  const discussionState = useSelector((state) => state.discussions);
  const [ topicDiscussions, setTopicDiscussions ] = useState([]);

  useEffect(() => {
    // TODO: Abort Controller cleanup function
    const controller = new AbortController();

    if (!discussionState.retrieved.includes(topic_url)) {
      dispatch(setCurrentTopic(topic_url))
      handle(retrieveTopicDiscussions(topic_url), {});
      return;
    } 
    
    // TODO yuse url or id?
    for (const [url, list] of Object.entries(discussionState.list)) {
      if (url ===  topic_url) {
        setTopicDiscussions(list);
      }
    }

    return () => {
      controller.abort();
    };
  // eslint-disable-next-line
  }, [ discussionState, topic_url ]);

  let result;
  if (!topicDiscussions.length) {
    result = <p>no discussions :(</p>
  } else {
    result =  <DiscussionCard discussions={ topicDiscussions } topic_url={ topic_url } />
  }

  return (
    <div>
      <h1>discussions</h1>
      { error && <h1>{ error }</h1> }
      { isLoading ? <p>loading...</p> : <div>{ result }</div> } 
     
    </div>
  );
};

export default Discussions;
