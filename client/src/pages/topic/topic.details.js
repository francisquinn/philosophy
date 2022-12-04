import { retrieveTopicByUrl, setCurrentTopic } from "../../slices/topic.slice";
import PageTitle from "../../components/utils/page-title.component";
import DiscussionCard from "../../components/discussion/discussion-card.component";
import { 
  retrieveTopicDiscussions
} from "../../slices/discussion.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDispatchHandler from "../../hooks/useDispatchHandler";
//import SkeletonElement from "../../components/skeletons/SkeletonElement.component";
import SkeletonDiscussion from "../../components/skeletons/SkeletonDiscussion.component";

const TopicDetailsPage = () => {
  const { topic_url } = useParams();
  const { handle, isLoading, error } = useDispatchHandler();
  const dispatch = useDispatch();
  const discussionState = useSelector((state) => state.discussions);
  const topicState = useSelector((state) => state.topics);
  const [ topicDiscussions, setTopicDiscussions ] = useState([]);

  useEffect(() => {
    // TODO: Abort Controller cleanup function
   const controller = new AbortController();

    if (!discussionState.retrieved.includes(topic_url)) {
      handle(retrieveTopicDiscussions({  topic_url: topic_url, signal: controller.signal }), {});
      return () => controller.abort();
    } 
    
    // TODO use url or id?
    for (const [url, list] of Object.entries(discussionState.list)) {
      if (url ===  topic_url) {
        setTopicDiscussions(list);
      }
    }

    if (topicState.list.length > 0) {
      // retrieve from store & set topic
      for (const topic of topicState.list) {
          if (topic.url === topic_url) {
              dispatch(setCurrentTopic(topic));
              return;
          }
      }
      return;
    } 
    // retrieve from api
    if (Object.keys(topicState.current).length === 0) {
      handle(retrieveTopicByUrl(topic_url), {});
      return () => controller.abort();
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
    <>
      { error && <h1>{ error }</h1> }
      { isLoading ? (
        <>
          {[1,2,3,4,5].map((n) => <SkeletonDiscussion key={n} />)}
        </>
      ) : (
        <>
          <div className="page-content">
            <PageTitle title={ topicState.current.title } />
            <div>{ result }</div>
            {[1,2,3,4,5].map((n) => <SkeletonDiscussion key={n} />)}
          </div>
        </>
      )} 
    </>
  );
  
};

export default TopicDetailsPage;
