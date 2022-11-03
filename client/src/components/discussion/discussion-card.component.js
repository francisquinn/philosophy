import { Link } from "react-router-dom";

const DiscussionCard = ({ discussions, topic_url }) => {
  return (
      discussions.map((discussion, index) => (
        <Link to={`/topics/${topic_url}/${discussion.url}`} key={index}>
          <div className="card">
            <h3>{ discussion.title }</h3>
          </div>
        </Link>
     ))
  );
};

export default DiscussionCard;
