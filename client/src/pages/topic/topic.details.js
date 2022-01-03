import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { retrieveTopicByUrl } from "../../slices/topic.slice";
import useDispatchRequest from "../../hooks/useDispatchRequest";

const TopicDetails = () => {
  const { topic_url } = useParams();
  const {
    data: topic,
    isLoading,
    isError,
  } = useDispatchRequest(retrieveTopicByUrl(topic_url));

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error...</h1>}
      <h1>topic details {topic_url}</h1>
      <h4>{topic.title}</h4>
      <span>{topic.description}</span>
      <br />
      <Link to={`/topics/${topic_url}/discussions`}>
        topic discussions
      </Link>
    </div>
  );
};

export default TopicDetails;
