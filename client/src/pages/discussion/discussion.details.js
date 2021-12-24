import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DiscussionDetails = () => {
  const { discussion_id } = useParams();
  return (
    <div>
      <h1>discussion details {discussion_id}</h1>
      <Link to={`/topics/${topic_id}/discussions`}>topic discussions</Link>
    </div>
  );
};

export default DiscussionDetails;