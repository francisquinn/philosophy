import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { retrieveTopicByUrl, retrieveTopics, setCurrentTopic } from "../../slices/topic.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const TopicDetails = (props) => {
    const dispatch = useDispatch();
    const { handle, isLoading, error } = useDispatchHandler();
    const state = useSelector((state) => state.topics);
    const topic = state.topic;
    const { topic_url } = props;

    useEffect(() => {
        if (state.topics.length) {
            // retrieve from store & set topic
            for (const t of state.topics) {
                if (t.url === topic_url) {
                    dispatch(setCurrentTopic(t));
                    return;
                }
            }
            return;
        } 
        // retrieve from api
        handle(retrieveTopicByUrl(topic_url), {});
        handle(retrieveTopics(), {});
        dispatch(setCurrentTopic(topic_url));
        // eslint-disable-next-line
    }, [topic_url, state.topics]);

  
  return (
    <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{ error }</h1>}
        {topic &&
            <div>
                <span>{topic.description}</span>
                <br />
                <Link to={`/topics/${topic_url}/discussions`}>
                topic discussions
                </Link>
            </div>
        } 
    </div>
  );
};

export default TopicDetails;
