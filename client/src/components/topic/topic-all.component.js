import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { retrieveTopics } from "../../slices/topic.slice";
import useDispatchFetch from "../../hooks/useDispatchFetch";

const TopicsList = () => {
  const {isLoading, isError} = useDispatchFetch(retrieveTopics())
  const topics = useSelector((state) => state.topics);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error...</h1>}
      {topics &&
        topics.map((topic, index) => (
          <Link to={`/topics/${topic.url}`} key={index}>
            <div className="topic-container">
              <h2>{topic.title}</h2>
              <em>{topic.description}</em>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TopicsList;
