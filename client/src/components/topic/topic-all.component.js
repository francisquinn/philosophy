import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTopics } from "../../slices/topic.slice";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const topics = useSelector((state) => state.topics.values);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(retrieveTopics())
      .then((res) => {
        setIsLoading(false);
        setTopics(res.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {topics.map((topic, index) => (
        <Link to={`/topics/${topic._id}`} key={index}>
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
