import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    //topics.map((topic, index) => (
      <Link to={{ pathname: `/topics/${topic.url}`, query: "test" }}>
        <div className="card">
          <p className="card-title">{topic.title}</p>
        </div>
      </Link>
     //))
  );
};

export default TopicCard;
