import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { retrieveTopicByUrl, setCurrentTopic } from "../../slices/topic.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const TopicDetails = (props) => {
    const dispatch = useDispatch();
    const { handle, isLoading, error } = useDispatchHandler();
    const state = useSelector((state) => state.topics);
    const topic = state.topic;

    useEffect(() => {
        if (state.topics.length > 0) {
            // retrieve from store & set topic
            for (const t of state.topics) {
                if (t.url === props.topic_url) {
                    dispatch(setCurrentTopic(t));
                    return;
                }
            }
        } else {
            // retrieve from api
            handle(retrieveTopicByUrl(props.topic_url), {});
        }
        // eslint-disable-next-line
    }, [dispatch, props.topic_url, state.topics]);

  return (
    <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{ error }</h1>}
        {topic &&
            <div>
                <h1>topic details {props.topic_url}</h1>
                <h4>{topic.title}</h4>
                <span>{topic.description}</span>
                <br />
                <Link to={`/topics/${props.topic_url}/discussions`}>
                topic discussions
                </Link>
            </div>
        } 
    </div>
  );
};

export default TopicDetails;
