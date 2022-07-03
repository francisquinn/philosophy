import { Link } from "react-router-dom";
import { useSelector  } from "react-redux";
import { retrieveTopics } from "../../slices/topic.slice";
import { useEffect } from "react";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const TopicsList = () => {
  const { handle, isLoading, error } = useDispatchHandler();
  const state = useSelector((state) => state.topics);
  const topics = state.topics;

  useEffect(() => {
    if (!topics.length) {
      handle(retrieveTopics(), {});
    }
    // eslint-disable-next-line
  }, [topics]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{ error }</h1>}
      {topics &&
        topics.map((topic, index) => (
          <Link to={{ pathname: `/topics/${topic.url}`, query: "test" }} key={index}>
            <div className="card">
              <p className="card-title">{topic.title}</p>
              <em>{topic.description}</em>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default TopicsList;
