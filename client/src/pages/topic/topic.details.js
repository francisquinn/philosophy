import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TopicDetails = () => {
  const { topic_url } = useParams();
  return (
    <div>
      <h1>topic details {topic_url}</h1>
      <Link to={`/topics/${topic_url}/discussions`}>topic discussions</Link>
    </div>
  );
};

export default TopicDetails;
