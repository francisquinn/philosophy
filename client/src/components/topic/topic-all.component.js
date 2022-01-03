import { Link } from "react-router-dom";
import { retrieveTopics } from "../../slices/topic.slice";
import useDispatchRequest from "../../hooks/useDispatchRequest";

const TopicsList = () => {
  const {
    data: topics,
    isLoading,
    isError,
  } = useDispatchRequest(retrieveTopics());
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
