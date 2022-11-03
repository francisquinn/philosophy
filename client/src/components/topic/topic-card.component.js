import { Link } from "react-router-dom";

const TopicCard = ({ topics }) => {
  return (
    topics.map((topic, index) => (
      <Link to={{ pathname: `/topics/${topic.url}`, query: "test" }} key={index}>
        <div className="card">
          <p className="card-title">{topic.title}</p>
        </div>
      </Link>
     ))
  );
};

export default TopicCard;
