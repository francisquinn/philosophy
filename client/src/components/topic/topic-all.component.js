import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { retrieveTopics } from "../../slices/topic.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const TopicsList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.topics);
  const topics = state.topics;

  useEffect(() => {
    if (topics.length === 0) {
      dispatch(retrieveTopics());
    }
  }, [dispatch, topics]);

  return (
    <div>
      {state.isLoading && <h1>Loading...</h1>}
      {state.isError && <h1>Error...</h1>}
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
