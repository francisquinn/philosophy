import { Link } from "react-router-dom";

const DiscussionCard = ({ discussions, topic_url }) => {
  console.log(discussions)
  return (
      discussions.map((discussion, index) => (
        <Link to={`/topics/${topic_url}/${discussion.url}`} key={index}>
          <div className="card">
            <h3>{ discussion.title }</h3>
            <div className="row mt-2">
              <div className="col">
                <span>likes </span>
                <span>replies </span>
              </div>
              <div className="col ml-auto">
                by <i>{ discussion.author }</i>
              </div>
            </div>
          </div>
        </Link>
     ))
  );
};

export default DiscussionCard;
