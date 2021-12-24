import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TopicDetails = () => {
  const { topic_id } = useParams();
  return (
    <div>
      <h1>topic details {topic_id}</h1>
      <Link to={`/topics/${topic_id}/discussions`}>topic discussions</Link>
    </div>
  );
};

export default TopicDetails;
